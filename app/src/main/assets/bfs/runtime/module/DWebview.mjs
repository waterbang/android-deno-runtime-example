import { callDeno } from "../../deno/android.fn.mjs";
import { deno } from "../../deno/index.mjs";
import { metaData } from "../../BFS-App-Metadata.mjs";
class DWebview {
  constructor(id) {
    this.url = `https://${id}.dweb`;
    this.initAppMetaData();
  }
  initAppMetaData() {
    if (Object.keys(metaData).length === 0)
      return;
    `"'${JSON.stringify(metaData)}'"`;
    deno.callFunction(callDeno.initMetaData, JSON.stringify(JSON.stringify(metaData)));
  }
  async onRequest(url) {
    const response = await fetch(url);
    const responseData = await response.text();
    console.log(JSON.stringify(responseData));
    return responseData;
  }
  activity(entry) {
    console.log(new URL(entry, this.url).href);
    deno.callFunction(callDeno.openDWebView, `"'${new URL(entry, this.url).href}'"`);
  }
}
export { DWebview };
//# sourceMappingURL=DWebview.mjs.map
