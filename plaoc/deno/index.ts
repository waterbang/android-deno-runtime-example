/////////////////////////////
/// 这里封装调用deno的方法，然后暴露出去
/////////////////////////////
import { getWebSocket } from "../gateway/index";

export class Deno {
  constructor() {}

  /// 调用deno的函数
  async callFunction(handleFn: string, data?: string): Promise<any> {
    const webSockets = await getWebSocket(); // 单一性不要担心重新创建
    return webSockets.sendData(handleFn, data);
  }
}
