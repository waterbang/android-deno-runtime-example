/////////////////////////////
/// 这里封装调用deno的方法，然后暴露出去
/////////////////////////////
import { getWebSocket } from "../gateway/index";
import { EConnectStatus } from "../gateway/WebSockets";

export class Deno {
  constructor() {}

  /// 调用deno的函数
  async callFunction(handleFn: string) {
    const webSockets = await getWebSocket();
    await webSockets.awaitConnectWs();
    webSockets.sendData(handleFn);
  }
}
