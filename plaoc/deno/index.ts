/////////////////////////////
/// 这里封装调用deno的方法，然后暴露出去
/////////////////////////////

class _Deno {
  constructor() {}

  /// 调用deno的函数
  callFunction(_handleFn: string, _data?: DenoFFI.callData) {
    // todo `{"function":["${fun}"],"public_key":"'${this.public_key}'","data":${data}}`;
    // DenoFFI.JsCallFunction(_handleFn, import.meta.url);
  }
  /**
   * 第一块分区：版本号 2^10 1：表示消息，2：表示广播，3：心跳检测
   * 第二块分区：头部标记 2^32  根据版本号这里各有不同，假如是消息，就是0，1；如果是广播则是组
   * 第三块分区：数据主体
   */
  async structureBinary() {
    // const bitBody = Deno.read();
  }
}

export const deno = new _Deno();
