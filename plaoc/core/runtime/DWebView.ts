import { callDeno } from "../deno/android.fn";
import { deno } from "../deno/index";
import { MetaData } from "@bfsx/metadata";
import { createChannel } from "@bfsx/gateway";

export class DWebView {
  private isWaitingData = 1;
  /**反压高水位，暴露给开发者控制 */
  hightWaterMark = 1;
  url!: string;
  constructor(metaData: MetaData) {
    this.url = metaData.baseUrl;
    this.initAppMetaData(metaData);
    // this.createChannel();
    deno.createHeader();
  }

  waterOverflow(evalJs: string) {
    if (this.isWaitingData < this.hightWaterMark) return;
    console.log("waterOverflow:", this.isWaitingData);
    deno.callEvalJsStringFunction(callDeno.evalJsRuntime, `"${evalJs}"`);
  }
  /**
   * 初始化app元数据
   * @param metaData  元数据
   * @returns void
   */
  initAppMetaData(metaData: MetaData) {
    if (Object.keys(metaData).length === 0) return;
    deno.callFunction(callDeno.initMetaData, `'${JSON.stringify(metaData)}'`);
  }
  /**
   * 激活DwebView
   * @param entry // DwebView入口
   */
  activity(entry: string) {
    deno.callFunction(
      callDeno.openDWebView,
      `"${new URL(entry, this.url).href}"`
    );
  }
  /**
   * 启动channel
   */
  createChannel() {
    // createChannel();
  }
  openWait() {
    if (this.isWaitingData >= Number.MAX_SAFE_INTEGER) return;
    this.isWaitingData++;
  }
  closeWait() {
    if (this.isWaitingData === 0) return;
    this.isWaitingData--;
  }
  // // 乱写的 企图拦截网络请求未遂
  // async onRequest(url: string) {
  //   const response = await fetch(url);
  //   const responseData = await response.text();
  //   console.log(JSON.stringify(responseData));
  //   return responseData;
  // }
}
