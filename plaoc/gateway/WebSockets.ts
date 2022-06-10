export class WebSockets {
  webSockets!: WebSocket;
  statusArr = [
    { state: 0, value: "正在连接" },
    { state: 1, value: "已建立连接" },
    { state: 2, value: "正在关闭连接" },
    { state: 3, value: "已关闭连接" },
  ];
  registerUrl: string = "http://127.0.0.1:8000/register";
  constructor(url?: string) {
    if (url) {
      this.registerUrl = url;
    }
  }

  //注册客户端
  async sendSubscriptionToBackEnd(body: webSocket.registerBody) {
    const response = await fetch(this.registerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const responseData = await response.json();
    console.log(JSON.stringify(responseData));
    return responseData;
  }

  async connect(
    body: webSocket.registerBody = {
      public_key: "bMr9vohVtvBvWRS3p4bwgzSMoLHTPHSvVj",
    }
  ) {
    // 1. 注册客户端
    const res = await this.sendSubscriptionToBackEnd(body);
    // 创建webSockets对象，参数为服务器webSockets地址
    this.webSockets = new WebSocket(res.url);

    //监听连接状态的变化
    this.webSockets.onopen = (event) => this.socketChange();

    //监听接收消息的情况
    this.webSockets.onmessage = (res) => {
      console.log("webSockets.onmessage:", res);
    };
    this.webSockets.onclose = (event) => this.socketChange();
  }
  socketChange() {
    let state = this.webSockets.readyState;
    let val = this.statusArr.map((item) => {
      if (item.state == state) {
        return item.value;
      }
    });
    console.log("当前的连接状态是：", val);
    return val;
  }
  sendData(fun: string) {
    //1. 首先获取输入的信息，判断信息是否可以发送
    let val = `{"function":["${fun}"]}`;
    if (val == "" || val == undefined) {
      return;
    }

    this.webSockets.send(val);
  }
  /**
   *   关闭连接
   */
  closeConnect() {
    this.webSockets.close();
  }
}
