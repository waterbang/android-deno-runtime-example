import { getWebSocket } from "../gateway/index.mjs";
class Deno {
  constructor() {
  }
  async callFunction(handleFn) {
    const webSockets = await getWebSocket();
    await webSockets.awaitConnectWs();
    webSockets.sendData(handleFn);
  }
}
export { Deno };
//# sourceMappingURL=index.mjs.map
