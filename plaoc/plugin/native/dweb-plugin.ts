/**
 * 所有的dweb-plugin需要继承这个类
 */
export class DwebPlugin extends HTMLElement {
  asyncDataArr: string[] = []; // 存储迭代目标
  asyncIter: Interator<string> = {
    next: () => {
      return {
        value: undefined,
        done: true,
      };
    },
  }; // 迭代对象
  asyncNextIndex = 0; // 迭代索引
  /** 用来区分不同的Dweb-plugin建议使用英文单词，单元测试需要覆盖中文和特殊字符传输情况*/
  channelId = "";
  constructor() {
    super();
    const asyncIterable = this.asyncIterator();
    this.asyncIter = asyncIterable[Symbol.asyncIterator]();
  }
  /**接收kotlin的evaJs来的string */
  dispatchStringMessage = (data: string) => {
    console.log("dweb-plugin dispatchStringMessage:", data);
    this.asyncDataArr.push(data);
  };
  /**接收kotlin的evaJs来的buffer，转为string */
  dispatchBinaryMessage = (buf: ArrayBuffer) => {
    console.log("dweb-plugin dispatchBinaryMessage:", buf);
    const data = new TextDecoder("utf-8").decode(new Uint8Array(buf)); // 需要测试特殊字符和截断问题
    console.log("dweb-plugin dispatchBinaryMessage:", data);
    this.asyncDataArr.push(data);
  };
  postMessage() {}
  onMesage() {}

  /**迭代器生成函数*/
  asyncIterator() {
    return {
      [Symbol.asyncIterator]: () => {
        return {
          next: () => {
            if (
              this.asyncDataArr.length !== 0 &&
              this.asyncNextIndex < this.asyncDataArr.length
            ) {
              return Promise.resolve({
                value: this.asyncDataArr[this.asyncNextIndex++],
                done: false,
              });
            } else {
              this.onClose();
              return { value: undefined, done: true };
            }
          },
        };
      },
    };
  }
  /**
   * 发送请求get Kotlin 转发
   * @param fun 操作函数
   * @param data 数据
   * @returns Promise<Ok>
   */
  async onPolling(fun: string, data: string = "''"): Promise<string> {
    const message = `{"function":["${fun}"],"data":${data},"channelId":${this.channelId}}`;
    const buffer = new TextEncoder().encode(message);
    return this.connectChannel(`/poll?data=${buffer}`);
  }
  /**
   * 请求kotlin 代理转发
   * @param url
   * @returns 直接返回ok
   */
  async connectChannel(url: string) {
    const response = await fetch(url, {
      method: "GET", // dwebview 无法获取post的body
      headers: {
        "Access-Control-Allow-Origin": "*", // 客户端开放，不然会报cors
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
    const data = await response.text();
    console.log(data);
    return data;
  }
  /**返回需要监听的属性 */
  static get observedAttributes() {
    return ["channelId"]; // 用来区分多个组件
  }
  /**当属性值改变的时候会调用 attributeChangedCallback 这个我 */
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    console.log("channelId: ", name, oldValue, newValue);
    if (name === "channelId") {
      this.channelId = newValue;
    }
  }
  // dom被删除的声明周期
  disconnectedCallback() {
    this.onClose();
  }
  // 关闭
  private onClose() {
    this.asyncNextIndex = 0;
    this.asyncDataArr = [];
  }
}

type Interator<T> = {
  next: () =>
    | Promise<{ value: T; done: boolean }>
    | { value: any; done: boolean };
};
