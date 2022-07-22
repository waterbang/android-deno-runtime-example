/////////////////////////////
/// 核心调度代码
/////////////////////////////
import { DWebView } from "./runtime/DWebView";
import { openScanner } from "./runtime/scanner";
import { MetaData } from "@bfsx/metadata";

const openDWebView = (metaData: MetaData) => {
  const dwebview = new DWebView(metaData);
  dwebview.activity(metaData.manifest.enter);
};

export { openDWebView, openScanner };

// openDWebView();
