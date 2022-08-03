import { DWebView } from "./runtime/DWebView.mjs";
import "./deno/index.mjs";
const openDWebView = (metaData) => {
  const dwebview = new DWebView(metaData);
  dwebview.activity(metaData.manifest.enter);
};
export { openDWebView };
//# sourceMappingURL=index.mjs.map
