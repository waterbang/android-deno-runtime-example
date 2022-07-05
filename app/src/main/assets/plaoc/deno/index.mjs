import { getWebSocket } from "../gateway/index.mjs";
class Deno {
  constructor() {
  }
  async callFunction(handleFn, data) {
    const webSockets = await getWebSocket();
    return webSockets.sendData(handleFn, data);
  }
}
const deno = new Deno();
export { deno };
//# sourceMappingURL=index.mjs.map
