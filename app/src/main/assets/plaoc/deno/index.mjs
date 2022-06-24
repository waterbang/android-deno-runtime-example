import { getWebSocket } from "../gateway/index.mjs";
class Deno {
  constructor() {
  }
  async callFunction(handleFn, data) {
    const webSockets = await getWebSocket();
    return webSockets.sendData(handleFn, data);
  }
}
export { Deno };
//# sourceMappingURL=index.mjs.map
