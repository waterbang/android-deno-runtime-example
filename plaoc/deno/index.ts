/////////////////////////////
/// 这里封装调用deno的方法，然后暴露出去
/////////////////////////////

class Deno {
  constructor() {}

  /// 调用deno的函数
  async callFunction(handleFn: string, data?: Deno.callData): Promise<any> {}
}

export const deno = new Deno();
