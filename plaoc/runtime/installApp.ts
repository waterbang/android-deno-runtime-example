import { AppRuntime } from "./AppRuntime";
import { DWebView } from "./module/DWebView";

export const openDWebView = (app: Runtime.IManifestApp) => {
  const appRuntime = new AppRuntime(app.id, app.defaultEntry);
  const dwebview = appRuntime.installRuntime() as DWebView;

  dwebview.activity(app.defaultEntry);

  // 1.创建和Deno交互的模块
};
