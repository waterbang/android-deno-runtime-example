/////////////////////////////
/// 这里是所有DwebView-js的网关
/////////////////////////////
import { WebSockets } from "./WebSockets";

let webSockets: WebSockets;
/// 拿到全局的webSockets对象
const getWebSocket = async (): Promise<WebSockets> => {
  return new Promise(async (resolve, reject) => {
    if (webSockets === undefined) {
      try {
        webSockets = new WebSockets();
        await webSockets.connect();
      } catch (e) {
        reject(e);
      }
    }
    resolve(webSockets);
  });
};

export { getWebSocket };
