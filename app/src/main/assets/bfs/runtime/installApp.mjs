import { AppRuntime } from "./AppRuntime.mjs";
const installApp = (app) => {
  const appRuntime = new AppRuntime(app.id, app.defaultEntry);
  const dwebview = appRuntime.inker();
  dwebview.activity(app.defaultEntry);
};
export { installApp };
//# sourceMappingURL=installApp.mjs.map
