export class WebSockets {
  ws!: WebSocket;
  registerUrl: string = "http://127.0.0.1:8000/register";
  constructor(url?: string) {
    if (url) {
      this.registerUrl = url;
    }
  }

  // 注册客户端
  async sendSubscriptionToBackEnd(body: webSocket.registerBody) {
    return fetch(this.registerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("responseData:", JSON.stringify(responseData));
        return responseData;
      })
      .catch((error) => {
        console.error("Error:", error);
        return error;
      });
  }

  async connect(
    body: webSocket.registerBody = {
      public_key: "bMr9vohVtvBvWRS3p4bwgzSMoLHTPHSvVj",
    }
  ) {
    // 注册客户端
    const res = await this.sendSubscriptionToBackEnd(body);
    this.ws = new WebSocket(res.url);
    return this.ws;
  }

  socketChange() {
    let state = this.ws.readyState;
    return state;
  }

  sendData(fun: string) {
    let val = `{"function":["${fun}"]}`;
    if (fun == undefined) {
      throw new Error("的传递websocket消息为空");
    }
    console.log("sendData:", fun);
    this.ws.send(val);
  }
  awaitConnectWs() {
    let index = 1;
    return new Promise(async (resolve, reject) => {
      do {
        const status = this.socketChange();
        console.log(
          `正在连接websocket：${index}第次,当前的连接状态是${connectStatus[status]}`
        );
        if (status === EConnectStatus.已建立连接) {
          resolve(status);
          break;
        }
        if (
          status === EConnectStatus.正在关闭连接 ||
          status === EConnectStatus.已关闭连接
        ) {
          reject("close ws");
          break;
        }
        index++;
        await sleep(500); // 不要太快发请求
      } while (index <= 10);
      reject("连接超时");
    });
  }
  closeConnect() {
    this.ws.close();
  }
}

const sleep = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));

export enum EConnectStatus {
  "正在连接" = 0,
  "已建立连接" = 1,
  "正在关闭连接" = 2,
  "已关闭连接" = 3,
}

const connectStatus = ["正在连接", "已建立连接", "正在关闭连接", "已关闭连接"];
