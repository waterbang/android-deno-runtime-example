import { AppRuntime } from "./AppRuntime.mjs";
const installApp = async (app) => {
  console.log("installApp");
  const appRuntime = new AppRuntime(app.defaultEntry);
  const dwebview = appRuntime.inker("dwebview");
  dwebview.onRequest("dweb:://aa");
  dwebview.activity();
};
export { installApp };
//# sourceMappingURL=installApp.mjs.map
