export class dwebPlugin extends HTMLElement {
  constructor() {
    super();
  }
  dispatchStringMessage = (data: string) => {
    console.log("dweb-plugin:", data);
  };
  dispatchBinaryMessage = (byte: ArrayBuffer) => {
    console.log("dweb-plugin:", byte);
  };
  postMessage() {}
  onMesage() {}
  // dwebview 无法获取post的body
  async connectChannel(url: string) {
    const response = await fetch(url, {
      method: "GET",
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
  async onPolling(fun: string, data: string = "''"): Promise<string> {
    const message = `{"function":["${fun}"],"data":${data}}`;
    const buffer = new TextEncoder().encode(message);
    return this.connectChannel(`/poll?data=${buffer}`);
  }
  onClose() {}
}

customElements.define("dweb-plugin", dwebPlugin);
