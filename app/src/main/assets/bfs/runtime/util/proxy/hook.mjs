const realXhr = "__xhr";
let events = [
  "load",
  "loadend",
  "timeout",
  "error",
  "readystatechange",
  "abort"
];
function configEvent(event, xhrProxy) {
  let e = {};
  for (let attr in event)
    e[attr] = event[attr];
  e.target = e.currentTarget = xhrProxy;
  return e;
}
function hook(proxy, win) {
  win = win || window;
  win[realXhr] = win[realXhr] || win.XMLHttpRequest;
  console.log("win[realXhr]: ", win[realXhr]);
  win.XMLHttpRequest = function() {
    let xhr = new win[realXhr]();
    for (let i = 0; i < events.length; ++i) {
      let key = "on" + events[i];
      if (xhr[key] === void 0)
        xhr[key] = null;
    }
    for (let attr in xhr) {
      let type = "";
      try {
        type = typeof xhr[attr];
      } catch (e) {
      }
      if (type === "function") {
        this[attr] = () => {
          return () => {
            let args = [].slice.call(arguments);
            if (proxy[attr]) {
              let ret = proxy[attr].call(this, args, xhr);
              if (ret)
                return ret;
            }
            return xhr[attr].apply(xhr, args);
          };
        };
      } else {
        return new Proxy(this, {
          get: (attr2) => {
            return () => {
              let v = this.hasOwnProperty(attr2 + "_") ? this[attr2 + "_"] : this.xhr[attr2];
              let attrGetterHook = (proxy[attr2] || {})["getter"];
              return attrGetterHook && attrGetterHook(v, this) || v;
            };
          },
          set: (attr2) => {
            return (that, p, v) => {
              let hook2 = proxy[attr2];
              if (attr2.substring(0, 2) === "on") {
                that[attr2 + "_"] = v;
                xhr[attr2] = (e) => {
                  e = configEvent(e, that);
                  let ret = proxy[attr2] && proxy[attr2].call(that, xhr, e);
                  ret || v.call(that, e);
                };
              } else {
                let attrSetterHook = (hook2 || {})["setter"];
                v = attrSetterHook && attrSetterHook(v, this) || v;
                this[attr2 + "_"] = v;
                try {
                  xhr[attr2] = v;
                } catch (e) {
                }
              }
            };
          },
          getOwnPropertyDescriptor: function(_target, _key) {
            return { enumerable: true, configurable: true };
          }
        });
      }
    }
    xhr.getProxy = () => {
      return this;
    };
  };
  Object.assign(win.XMLHttpRequest, {
    UNSENT: 0,
    OPENED: 1,
    HEADERS_RECEIVED: 2,
    LOADING: 3,
    DONE: 4
  });
  return win[realXhr];
}
export { configEvent, events, hook };
//# sourceMappingURL=hook.mjs.map
