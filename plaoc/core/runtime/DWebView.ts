import { callDeno } from "../deno/android.fn";
import { deno } from "../deno/index";
import { MetaData } from "@bfsa/dweb-manifest";

export class DWebView {
  url!: string;
  constructor(metaData: MetaData) {
    this.initAppMetaData(metaData);
    deno.createHeader();
  }
  // 初始化app元数据
  initAppMetaData(metaData: MetaData) {
    if (Object.keys(metaData).length === 0) return;
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
