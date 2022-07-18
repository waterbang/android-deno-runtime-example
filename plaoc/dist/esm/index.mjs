export { openScanner } from "./plugin/scanner/index.mjs";
export { HTMLDWebNavigatorElement } from "./plugin/navigation/index.mjs";
import { openDWebView } from "./runtime/installApp.mjs";
export { openDWebView } from "./runtime/installApp.mjs";
export { BfcsNavigator } from "./plugin/navigation/BfcsNavigator.mjs";
openDWebView({
  id: "bMr9vohVtvBvWRS3p4bwgzSMoLHTPHSvVj",
  name: "defaultApp",
  versionCode: 1,
  minBfsVersionCode: 1,
  defaultEntry: "hello_runtime.html"
});
//# sourceMappingURL=index.mjs.map
