export class WebSockets {
  ws!: WebSocket;
  public_key!: string;
  registerUrl: string = "http://127.0.0.1:8000/register";
  constructor(url?: string) {
    if (url) {
      this.registerUrl = url;
    }
  }

  // 注册客户端
  async sendSubscriptionToBackEnd(body: WebSocket.registerBody) {
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
    body: WebSocket.registerBody = {
      public_key: "bMr9vohVtvBvWRS3p4bwgzSMoLHTPHSvVj",
    }
  ) {
    this.public_key = body.public_key;
    const res = await this.sendSubscriptionToBackEnd(body);
    this.ws = new WebSocket(res.url);
    await this.awaitConnectWs();
    return this.ws;
  }

  // 获取连接状态
  socketChange() {
    let state = this.ws.readyState;
    return state;
  }

  sendData(fun: string, data?: Deno.callData) {
    // 携带函数和自己的公钥，不然返回数据是异步的，不知道给谁
    let val = `{"function":["${fun}"],"public_key":"'${this.public_key}'","data":${data}}`;
    if (fun == undefined) {
      throw new Error("的传递websocket消息为空");
    }
    console.log("sendData:", val);
    return new Promise(async (resolve, reject) => {
      this.ws.send(val);
      // 设置超时时间
      let timer = setTimeout(() => {
        reject("连接超时");
        clearTimeout(timer);
      }, 20000);
      //监听接收消息的情况
      this.ws.onmessage = (res) => {
        clearTimeout(timer);
        resolve(res.data);
      };
    });
  }

  // 等待连接上
  awaitConnectWs() {
    let index = 1;
    return new Promise(async (resolve, reject) => {
      do {
        const status = this.socketChange();
        console.log(
          `正在连接websocket：第${index}次,当前的连接状态是${connectStatus[status]}`
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
        await sleep(10); // 不要太快发请求
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
