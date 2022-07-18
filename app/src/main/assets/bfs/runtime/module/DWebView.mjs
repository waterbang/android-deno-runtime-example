import { callDeno } from "../../deno/android.fn.mjs";
import { deno } from "../../deno/index.mjs";
import { metaData } from "../../BFS-App-Metadata.mjs";
class DWebView {
  constructor(id) {
    this.url = `https://${id}.dweb`;
    this.initAppMetaData();
    deno.createHeader();
  }
  initAppMetaData() {
    if (Object.keys(metaData).length === 0)
      return;
    metaData.baseUrl = this.url;
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
