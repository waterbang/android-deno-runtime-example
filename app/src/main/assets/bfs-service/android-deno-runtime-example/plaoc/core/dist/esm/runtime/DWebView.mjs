import { callDeno } from "../deno/android.fn.mjs";
import { deno } from "../deno/index.mjs";
import { createChannel } from "../../../../gateway/dist/esm/channel.mjs";
class DWebView {
  constructor(metaData) {
    this.isWaitingData = false;
    this.url = metaData.baseUrl;
    this.initAppMetaData(metaData);
    this.createChannel();
    deno.createHeader();
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
    try {
      createChannel();
    } catch (e) {
      console.log(e);
    }
  }
}
export { DWebView };
//# sourceMappingURL=DWebView.mjs.map
