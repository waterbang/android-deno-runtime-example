export { HTMLDWebNavigatorElement } from "./plugin/navigation/index.mjs";
import { installApp } from "./runtime/installApp.mjs";
import "./deno/rust.ffi.mjs";
export { BfcsNavigator } from "./plugin/navigation/BfcsNavigator.mjs";
function openDWebView() {
  installApp({
    id: "bMr9vohVtvBvWRS3p4bwgzSMoLHTPHSvVj",
    name: "defaultApp",
    versionCode: 1,
    minBfsVersionCode: 1,
    defaultEntry: "app/bfchain.dev/index.html"
  });
}
installApp({
  id: "bMr9vohVtvBvWRS3p4bwgzSMoLHTPHSvVj",
  name: "defaultApp",
  versionCode: 1,
  minBfsVersionCode: 1,
  defaultEntry: "hello_runtime.html"
});
export { openDWebView };
//# sourceMappingURL=index.mjs.map
