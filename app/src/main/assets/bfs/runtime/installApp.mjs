import { AppRuntime } from "./AppRuntime.mjs";
const openDWebView = (app) => {
  const appRuntime = new AppRuntime(app.id, app.defaultEntry);
  const dwebview = appRuntime.installRuntime();
  dwebview.activity(app.defaultEntry);
};
export { openDWebView };
//# sourceMappingURL=installApp.mjs.map
