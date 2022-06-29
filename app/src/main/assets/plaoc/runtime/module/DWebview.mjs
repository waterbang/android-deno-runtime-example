import { callDeno } from "../../deno/fn.type.mjs";
import { Deno } from "../../deno/index.mjs";
const deno = new Deno();
class DWebview {
  constructor(id) {
    this.url = `https://${id}.dweb`;
  }
  onRequest(url) {
    return fetch(url).then((response) => response.text()).then(function(responseData) {
      console.log(JSON.stringify(responseData));
      return responseData;
    });
  }
  activity(entry) {
    console.log(new URL(entry, this.url).href);
    deno.callFunction(callDeno.openDWebView, new URL(entry, this.url).href);
  }
}
export { DWebview };
//# sourceMappingURL=DWebview.mjs.map
