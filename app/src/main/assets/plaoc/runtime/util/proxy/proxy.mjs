import { hook, events, configEvent } from "./hook.mjs";
let eventLoad = events[0], eventLoadEnd = events[1], eventTimeout = events[2], eventError = events[3], eventReadyStateChange = events[4], eventAbort = events[5];
function proxy(proxy2, win) {
  win = win || window;
  if (win["__xhr"])
    throw "Ajax is already hooked.";
  return proxyAjax(proxy2, win);
}
function getEventTarget(xhr) {
  return xhr.watcher || (xhr.watcher = document.createElement("a"));
}
function triggerListener(xhr, name) {
  let xhrProxy = xhr.getProxy();
  let callback = "on" + name + "_";
  let event = configEvent({ type: name }, xhrProxy);
  xhrProxy[callback] && xhrProxy[callback](event);
  let evt;
  if (typeof Event === "function") {
    evt = new Event(name, { bubbles: false });
  } else {
    evt = document.createEvent("Event");
    evt.initEvent(name, false, true);
  }
  getEventTarget(xhr).dispatchEvent(evt);
}
class Header {
  constructor(xhr) {
    this.xhr = xhr;
    this.xhrProxy = xhr.getProxy();
  }
  resolve(response) {
    let xhrProxy = this.xhrProxy;
    let xhr = this.xhr;
    xhrProxy.readyState = 4;
    xhr.resHeader = response.headers;
    xhrProxy.response = xhrProxy.responseText = response.response;
    xhrProxy.statusText = response.statusText;
    xhrProxy.status = response.status;
    triggerListener(xhr, eventReadyStateChange);
    triggerListener(xhr, eventLoad);
    triggerListener(xhr, eventLoadEnd);
  }
  reject(error) {
    this.xhrProxy.status = 0;
    triggerListener(this.xhr, error.type);
    triggerListener(this.xhr, eventLoadEnd);
  }
}
class RequestHandler extends Header {
  next(rq) {
    var xhr = this.xhr;
    rq = rq || xhr.config;
    xhr.withCredentials = rq.withCredentials;
    xhr.open(rq.method, rq.url, rq.async !== false, rq.user, rq.password);
    for (var key in rq.headers) {
      xhr.setRequestHeader(key, rq.headers[key]);
    }
    xhr.send(rq.body);
  }
}
class ResponseHandler extends Header {
  next(response) {
    this.resolve(response);
  }
}
class ErrorHandler extends Header {
  next(error) {
    this.reject(error);
  }
}
function proxyAjax(proxy2, win) {
  let onRequest = proxy2.onRequest, onResponse = proxy2.onResponse, onError = proxy2.onError;
  function handleResponse(xhr, xhrProxy) {
    let handler = new ResponseHandler(xhr);
    let ret = {
      response: xhrProxy.response || xhrProxy.responseText,
      status: xhrProxy.status,
      statusText: xhrProxy.statusText,
      config: xhr.config,
      headers: xhr.resHeader || xhr.getAllResponseHeaders().split("\r\n").reduce(function(ob, str) {
        if (str === "")
          return ob;
        let m = str.split(":");
        ob[m.shift()] = m.join(":").trim();
        return ob;
      }, {})
    };
    if (!onResponse)
      return handler.resolve(ret);
    onResponse(ret, handler);
  }
  function onerror(xhr, error, errorType) {
    let handler = new ErrorHandler(xhr);
    error = { config: xhr.config, error, type: errorType };
    if (onError) {
      onError(error, handler);
    } else {
      handler.next(error);
    }
  }
  function preventXhrProxyCallback() {
    return true;
  }
  function errorCallback(errorType) {
    return function(xhr, e) {
      onerror(xhr, e, errorType);
      return true;
    };
  }
  function stateChangeCallback(xhr, xhrProxy) {
    if (xhr.readyState === 4 && xhr.status !== 0) {
      handleResponse(xhr, xhrProxy);
    } else if (xhr.readyState !== 4) {
      proxy2.triggerListener(xhr, eventReadyStateChange);
    }
    return true;
  }
  return hook({
    onload: preventXhrProxyCallback,
    onloadend: preventXhrProxyCallback,
    onerror: errorCallback(eventError),
    ontimeout: errorCallback(eventTimeout),
    onabort: errorCallback(eventAbort),
    onreadystatechange: function(xhr) {
      return stateChangeCallback(xhr, this);
    },
    open: function open(args, xhr) {
      let _this = this;
      let config = xhr.config = {
        headers: {}
      };
      config.method = args[0];
      config.url = args[1];
      config.async = args[2];
      config.user = args[3];
      config.password = args[4];
      config.xhr = xhr;
      let evName = "on" + eventReadyStateChange;
      if (!xhr[evName]) {
        xhr[evName] = function() {
          return stateChangeCallback(xhr, _this);
        };
      }
      if (onRequest)
        return true;
    },
    send: function(args, xhr) {
      let config = xhr.config;
      config.withCredentials = xhr.withCredentials;
      config.body = args[0];
      if (onRequest) {
        let req = function() {
          onRequest(config, new RequestHandler(xhr));
        };
        config.async === false ? req() : setTimeout(req);
        return true;
      }
    },
    setRequestHeader: function(args, xhr) {
      xhr.config.headers[args[0].toLowerCase()] = args[1];
      if (onRequest)
        return true;
    },
    addEventListener: function(args, xhr) {
      if (events.indexOf(args[0]) !== -1) {
        let handler = args[1];
        proxy2.getEventTarget(xhr).addEventListener(args[0], (e) => {
          let event = configEvent(e, this);
          event.type = args[0];
          event.isTrusted = true;
          handler.call(this, event);
        });
        return true;
      }
    },
    getAllResponseHeaders: function(_, xhr) {
      let headers = xhr.resHeader;
      if (headers) {
        let header = "";
        for (let key in headers) {
          header += key + ": " + headers[key] + "\r\n";
        }
        return header;
      }
    },
    getResponseHeader: function(args, xhr) {
      let headers = xhr.resHeader;
      if (headers) {
        return headers[(args[0] || "").toLowerCase()];
      }
    }
  }, win);
}
export { getEventTarget, proxy, proxyAjax, triggerListener };
//# sourceMappingURL=proxy.mjs.map
