/// 负责创建Dwebview-js 跟Deno-js 通信的通道

import "@bfsx/typings";

export class Channel {
  private server: Deno.DatagramConn;
  port!: string;
  constructor() {
    this.server = Deno.listenDatagram({
      port: 0,
      transport: "udp",
    });
    try {
      this.port = this.server.addr.port;
      this.create();
    } catch (e) {
      console.warn("创建http链接失败：", e);
    }
  }
  async create() {
    // try {
    //   if (this.port) {
    //     // 转换为hex 作为channelId
    //     const hex = parseInt(this.port, 10).toString(16);
    //     this.channelUrl = `https://${hex}.${dWebId}.dweb`;
    //   }
    // } catch (e) {
    //   console.warn(e);
    // }
    // 使用异步迭代与服务器连接
    for await (const conn of this.server) {
      serveHttp(conn);
    }

    async function serveHttp(conn: Deno.Conn) {
      // 创建http链接
      const httpConn = Deno.serveHttp(conn);
      console.warn("xxxxx", httpConn);
      for await (const requestEvent of httpConn) {
        // 原生 HTTP 服务器使用 web 标准 `Request` 和 `Response`对象。
        console.log("requestEvent: ", requestEvent);
        const body = `Your user-agent is:\n\n${
          requestEvent.request.headers.get("user-agent") ?? "Unknown"
        }`;

        requestEvent.respondWith(
          new Response(body, {
            status: 200,
          })
        );
      }
    }
  }
  close() {
    this.server.close();
  }
}

export const createChannel = async (appId: string, callback: Function) => {};
