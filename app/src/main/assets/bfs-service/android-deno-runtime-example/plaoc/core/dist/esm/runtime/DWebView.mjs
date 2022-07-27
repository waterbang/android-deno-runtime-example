import { callDeno } from "../deno/android.fn.mjs";
import { deno } from "../deno/index.mjs";
class DWebView {
  constructor(metaData) {
    this.url = metaData.baseUrl;
    this.initAppMetaData(metaData);
    deno.createHeader();
  }
  initAppMetaData(metaData) {
    if (Object.keys(metaData).length === 0)
      return;
    deno.callFunction(callDeno.initMetaData, `'${JSON.stringify(metaData)}'`);
  }
  async onRequest(url) {
    const response = await fetch(url);
    const responseData = await response.text();
    console.log(JSON.stringify(responseData));
    return responseData;
  }
  activity(entry) {
    deno.callFunction(callDeno.openDWebView, `"${new URL(entry, this.url).href}"`);
  }
}
export { DWebView };
//# sourceMappingURL=DWebView.mjs.map
