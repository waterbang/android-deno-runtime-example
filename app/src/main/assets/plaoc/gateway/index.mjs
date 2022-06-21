import { WebSockets } from "./WebSockets.mjs";
let webSockets;
const getWebSocket = async (url) => {
  return new Promise(async (resolve, reject) => {
    if (webSockets === void 0 || url !== void 0) {
      try {
        webSockets = new WebSockets(url);
        await webSockets.connect();
      } catch (e) {
        reject(e);
      }
    }
    resolve(webSockets);
  });
};
export { getWebSocket };
//# sourceMappingURL=index.mjs.map
