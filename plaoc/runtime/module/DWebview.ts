import { callDeno } from "../../deno/android.fn";
import { deno } from "../../deno/index";
import { metaData } from "../../BFS-App-Metadata";

export class DWebview {
  url!: string;
  constructor(id: string) {
    this.url = `https://${id}.dweb`;
    this.initAppMetaData();
  }
  // 初始化app元数据
  initAppMetaData() {
    if (Object.keys(metaData).length === 0) return;
    const stringData = `"'${JSON.stringify(metaData)}'"`;
    deno.callFunction(
      callDeno.initMetaData,
      JSON.stringify(JSON.stringify(metaData))
    );
  }
  // 乱写的 咯咯哒🥚
  async onRequest(url: string) {
    const response = await fetch(url);
    const responseData = await response.text();
    console.log(JSON.stringify(responseData));
    return responseData;
  }
  // 激活DwebView
  activity(entry: string) {
    console.log(new URL(entry, this.url).href);
    deno.callFunction(
      callDeno.openDWebView,
      `"'${new URL(entry, this.url).href}'"`
    );
  }
}
