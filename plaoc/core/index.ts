/////////////////////////////
/// 核心调度代码
/////////////////////////////
import { DWebView } from "./runtime/DWebView";
import { openScanner } from "./runtime/scanner";
import { MetaData } from "@bfsx/metadata";

const openDWebView = (metaData: MetaData) => {
  const dwebview = new DWebView(metaData);
  dwebview.activity(metaData.manifest.enter);

  setTimeout(() => {
    // 模拟已经收到信号l
    dwebview.waterOverflow(
      "javascript:document.querySelector('dweb-messager').dispatchStringMessage('哈哈:我是messager')"
    );
    dwebview.waterOverflow(
      "javascript:document.querySelector('dweb-scanner').dispatchStringMessage('哈哈:我是scanner')"
    );
  }, 2000);
};

export { openDWebView, openScanner };

// openDWebView();
