export class dwebPlugin extends HTMLElement {
  private _isWaitingData = false;
  /**反压高水位，暴露给开发者控制 */
  hightWaterMark = 20;
  constructor() {
    super();
  }
  dispatchStringMessage = () => {};
  dispatchBinaryMessage = () => {};
}
