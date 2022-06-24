class WebSockets {
  constructor(url) {
    this.registerUrl = "http://127.0.0.1:8000/register";
    if (url) {
      this.registerUrl = url;
    }
  }
  async sendSubscriptionToBackEnd(body) {
    return fetch(this.registerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }).then((response) => response.json()).then((responseData) => {
      console.log("responseData:", JSON.stringify(responseData));
      return responseData;
    }).catch((error) => {
      console.error("Error:", error);
      return error;
    });
  }
  async connect(body = {
    public_key: "bMr9vohVtvBvWRS3p4bwgzSMoLHTPHSvVj"
  }) {
    this.public_key = body.public_key;
    const res = await this.sendSubscriptionToBackEnd(body);
    this.ws = new WebSocket(res.url);
    await this.awaitConnectWs();
    return this.ws;
  }
  socketChange() {
    let state = this.ws.readyState;
    return state;
  }
  sendData(fun, data) {
    let val = `{"function":["${fun}"],"public_key":"'${this.public_key}'","data":"'${data}'"}`;
    if (fun == void 0) {
      throw new Error("\u7684\u4F20\u9012websocket\u6D88\u606F\u4E3A\u7A7A");
    }
    console.log("sendData:", val);
    return new Promise(async (resolve, reject) => {
      this.ws.send(val);
      let timer = setTimeout(() => {
        reject("\u8FDE\u63A5\u8D85\u65F6");
        clearTimeout(timer);
      }, 2e4);
      this.ws.onmessage = (res) => {
        clearTimeout(timer);
        resolve(res.data);
      };
    });
  }
  awaitConnectWs() {
    let index = 1;
    return new Promise(async (resolve, reject) => {
      do {
        const status = this.socketChange();
        console.log(`\u6B63\u5728\u8FDE\u63A5websocket\uFF1A\u7B2C${index}\u6B21,\u5F53\u524D\u7684\u8FDE\u63A5\u72B6\u6001\u662F${connectStatus[status]}`);
        if (status === EConnectStatus.\u5DF2\u5EFA\u7ACB\u8FDE\u63A5) {
          resolve(status);
          break;
        }
        if (status === EConnectStatus.\u6B63\u5728\u5173\u95ED\u8FDE\u63A5 || status === EConnectStatus.\u5DF2\u5173\u95ED\u8FDE\u63A5) {
          reject("close ws");
          break;
        }
        index++;
        await sleep(10);
      } while (index <= 10);
      reject("\u8FDE\u63A5\u8D85\u65F6");
    });
  }
  closeConnect() {
    this.ws.close();
  }
}
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
var EConnectStatus = /* @__PURE__ */ ((EConnectStatus2) => {
  EConnectStatus2[EConnectStatus2["\u6B63\u5728\u8FDE\u63A5"] = 0] = "\u6B63\u5728\u8FDE\u63A5";
  EConnectStatus2[EConnectStatus2["\u5DF2\u5EFA\u7ACB\u8FDE\u63A5"] = 1] = "\u5DF2\u5EFA\u7ACB\u8FDE\u63A5";
  EConnectStatus2[EConnectStatus2["\u6B63\u5728\u5173\u95ED\u8FDE\u63A5"] = 2] = "\u6B63\u5728\u5173\u95ED\u8FDE\u63A5";
  EConnectStatus2[EConnectStatus2["\u5DF2\u5173\u95ED\u8FDE\u63A5"] = 3] = "\u5DF2\u5173\u95ED\u8FDE\u63A5";
  return EConnectStatus2;
})(EConnectStatus || {});
const connectStatus = ["\u6B63\u5728\u8FDE\u63A5", "\u5DF2\u5EFA\u7ACB\u8FDE\u63A5", "\u6B63\u5728\u5173\u95ED\u8FDE\u63A5", "\u5DF2\u5173\u95ED\u8FDE\u63A5"];
export { EConnectStatus, WebSockets };
//# sourceMappingURL=WebSockets.mjs.map
