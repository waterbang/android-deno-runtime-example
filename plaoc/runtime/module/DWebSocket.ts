import { getWebSocket } from "../../gateway";

export class DWebSocket {
  url = "";
  constructor(url: string) {
    url;
  }

  async send(data: any) {
    const ws = await getWebSocket(this.url);
    ws.sendData(data);
  }
}
