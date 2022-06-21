import { Deno } from "../../deno/index.mjs";
import { proxy } from "../util/proxy/proxy.mjs";
const deno = new Deno();
class DWebview {
  constructor() {
    proxy({
      onRequest: (config, handler) => {
        if (config.url === "http://aa/") {
          handler.resolve({
            config,
            status: 200,
            headers: { "content-type": "text/text" },
            response: "hi world"
          });
        } else {
          handler.next(config);
        }
      },
      onError: (err, handler) => {
        if (err.config.url === "dweb://aa/") {
          handler.resolve({
            config: err.config,
            status: 200,
            headers: { "content-type": "text/text" },
            response: "hi world"
          });
        } else {
          handler.next(err);
        }
      },
      onResponse: (response, handler) => {
        if (response.config.url === location.href) {
          handler.reject({
            config: response.config,
            type: "error",
            error: void 0
          });
        } else {
          handler.next(response);
        }
      }
    }, window);
  }
  onRequest(onBack) {
    console.log(onBack);
  }
  activity() {
    deno.callFunction(callDeno.openDWebView);
  }
}
export { DWebview };
//# sourceMappingURL=DWebview.mjs.map
