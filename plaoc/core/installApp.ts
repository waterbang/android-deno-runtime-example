import { DWebView } from "./runtime/DWebView";
import { MetaData } from "@bfsx/metadata";
export const openDWebView = (app: MetaData) => {
  const dwebview = new DWebView(app);
  dwebview.activity(app.manifest.enter);
};
