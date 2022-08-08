import { DWebView } from "./runtime/DWebView.mjs";
import "./deno/index.mjs";
const openDWebView = (metaData) => {
  const dwebview = new DWebView(metaData);
  dwebview.activity(metaData.manifest.enter);
  setTimeout(() => {
    dwebview.waterOverflow("javascript:document.querySelector('dweb-messager').dispatchStringMessage('\u54C8\u54C8:\u6211\u662Fmessager')");
    dwebview.waterOverflow("javascript:document.querySelector('dweb-scanner').dispatchStringMessage('\u54C8\u54C8:\u6211\u662Fscanner')");
  }, 2e3);
};
export { openDWebView };
//# sourceMappingURL=index.mjs.map
