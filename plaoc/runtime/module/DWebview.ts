import { Deno } from "../../deno/index";

const deno = new Deno();
export class DWebview {
  url: URL | undefined;
  constructor() {}

  onRequest(url: string) {
    console.log("请求的是：", url);
    return fetch(url)
      .then((response) => response.text())
      .then(function (responseData) {
        console.log(JSON.stringify(responseData));
        return responseData;
      });
  }

  activity() {
    // deno.callFunction(callDeno.openDWebView);
  }
}
