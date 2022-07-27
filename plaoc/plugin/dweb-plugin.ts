export class dwebPlugin extends HTMLElement {
  private isWaitingData = false;
  /**反压高水位，暴露给开发者控制 */
  hightWaterMark = 20;
  constructor() {
    super();
  }
  dispatchStringMessage = () => {};
  dispatchBinaryMessage = () => {};
  postMessage() {}
  onMesage() {}

  async onOpen(url: string, body: any) {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log(data);
    return data;
  }
  onPolling() {}
  onClose() {}
  openWait() {
    this.isWaitingData = true;
  }
  closeWait() {
    this.isWaitingData = false;
  }
}
