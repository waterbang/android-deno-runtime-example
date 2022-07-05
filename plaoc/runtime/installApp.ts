import { AppRuntime } from "./AppRuntime";
import { DWebview } from "./module/DWebview";

export const installApp = (app: Runtime.IManifestApp) => {
  const appRuntime = new AppRuntime(app.id, app.defaultEntry);
  const dwebview = appRuntime.inker() as DWebview;

  dwebview.activity(app.defaultEntry);

  // 1.创建和Deno交互的模块
};
