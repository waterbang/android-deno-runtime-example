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
    deno.callFunction(callDeno.openDWebView, entry);
  }
}
export { DWebview };
//# sourceMappingURL=DWebview.mjs.map
