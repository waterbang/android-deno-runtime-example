import { callDeno } from "../deno/android.fn.mjs";
import { deno } from "../deno/index.mjs";
class DWebView {
  constructor(metaData) {
    this.isWaitingData = 1;
    this.hightWaterMark = 1;
    this.url = metaData.baseUrl;
    this.initAppMetaData(metaData);
    deno.createHeader();
  }
  waterOverflow(evalJs) {
    if (this.isWaitingData < this.hightWaterMark)
      return;
    console.log("waterOverflow:", this.isWaitingData);
    deno.callEvalJsStringFunction(callDeno.evalJsRuntime, `"${evalJs}"`);
  }
  initAppMetaData(metaData) {
    if (Object.keys(metaData).length === 0)
      return;
    deno.callFunction(callDeno.initMetaData, `'${JSON.stringify(metaData)}'`);
  }
  activity(entry) {
    deno.callFunction(callDeno.openDWebView, `"${new URL(entry, this.url).href}"`);
  }
  createChannel() {
  }
  openWait() {
    if (this.isWaitingData >= Number.MAX_SAFE_INTEGER)
      return;
    this.isWaitingData++;
  }
  closeWait() {
    if (this.isWaitingData === 0)
      return;
    this.isWaitingData--;
  }
}
export { DWebView };
//# sourceMappingURL=DWebView.mjs.map
