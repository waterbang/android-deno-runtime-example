import { callDeno } from "../../deno/fn.type";
import { Deno } from "../../deno/index";

const deno = new Deno();
export class DWebview {
  url!: string;
  constructor(id: string) {
    this.url = `https://${id}.dweb`;
  }

  onRequest(url: string) {
    return fetch(url)
      .then((response) => response.text())
      .then(function (responseData) {
        console.log(JSON.stringify(responseData));
        return responseData;
      });
  }

  activity(entry: string) {
    deno.callFunction(callDeno.openDWebView, entry);
  }
}
