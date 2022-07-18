import { callDeno } from "../../deno/android.fn";
import { deno } from "../../deno/index";
import { metaData } from "../../BFS-App-Metadata";

export class DWebView {
  url!: string;
  constructor(id: string) {
    // 生成DwebView地址
    this.url = `https://${id}.dweb`;
    this.initAppMetaData();
    deno.createHeader();
  }
  // 初始化app元数据
  initAppMetaData() {
    if (Object.keys(metaData).length === 0) return;
    metaData.baseUrl = this.url;
    deno.callFunction(callDeno.initMetaData, `'${JSON.stringify(metaData)}'`);
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
    deno.callFunction(
      callDeno.openDWebView,
      `"${new URL(entry, this.url).href}"`
    );
  }
}
