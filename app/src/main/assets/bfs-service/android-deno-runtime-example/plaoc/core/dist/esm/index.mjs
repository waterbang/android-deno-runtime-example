import { DWebView } from "./runtime/DWebView.mjs";
import "./deno/index.mjs";
import { createChannel } from "../../../gateway/dist/esm/channel.mjs";
const openDWebView = (metaData) => {
  createChannel();
  const dwebview = new DWebView(metaData);
  dwebview.activity(metaData.manifest.enter);
};
export { openDWebView };
//# sourceMappingURL=index.mjs.map
