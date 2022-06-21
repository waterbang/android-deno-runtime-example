import { AppRuntime } from "./AppRuntime";
import { DWebview } from "./module/DWebview";
import { proxy } from "./util/proxy/proxy";

export const installApp = (app: runtime.ManifestApp) => {
  console.log("installApp");
  proxy(
    {
      onRequest: (config, handler) => {
        console.log("请求dweb://aa/; 伪造返回，请求会成功");
        if (config.url === "dweb://aa/") {
          handler.resolve({
            config: config,
            status: 200,
            headers: { "content-type": "text/text" },
            response: "hi world",
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
            response: "hi world",
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
            error: undefined,
          });
        } else {
          handler.next(response);
        }
      },
    },
    window
  );
  // 拦截fetch
  const originFetch = fetch;
  Object.defineProperty(window, "fetch", {
    configurable: true,
    enumerable: true,
    // writable: true,
    get() {
      return (url: URL | RequestInfo, init?: RequestInit | undefined) => {
        console.log("originFetch:", url);
        return Promise.resolve({
          text: () => {
            return Promise.resolve().then((res) => {
              return url;
            });
          },
        });
        // return originFetch.apply(window, [url, init]);
      };
    },
  });

  const appRuntime = new AppRuntime(app.defaultEntry);
  const dwebview = new DWebview();

  dwebview.onRequest("dweb:://aa");
  dwebview.activity();

  // 1.创建和Deno交互的模块
};
