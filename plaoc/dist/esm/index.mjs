export { HTMLDWebNavigatorElement } from "./plugin/navigation/index.mjs";
import { ManifestEntry } from "./runtime/AppRuntime.mjs";
import { installApp } from "./runtime/installApp.mjs";
export { BfcsNavigator } from "./plugin/navigation/BfcsNavigator.mjs";
const entryMap = /* @__PURE__ */ new Map();
const DwebviewEntry = new ManifestEntry("/getBlockInfo");
const copyEntry = new ManifestEntry("./copy.cjs");
entryMap.set("dwebview", DwebviewEntry);
entryMap.set("./copy.cjs", copyEntry);
function openDWebView() {
  installApp({
    id: "bMr9vohVtvBvWRS3p4bwgzSMoLHTPHSvVj",
    name: "defaultApp",
    versionCode: 1,
    minBfsVersionCode: 1,
    defaultEntry: "app/bfchain.dev/index.html",
    entryResourceMap: entryMap
  });
}
function openDefaultDWebView() {
  installApp({
    id: "bMr9vohVtvBvWRS3p4bwgzSMoLHTPHSvVj",
    name: "defaultApp",
    versionCode: 1,
    minBfsVersionCode: 1,
    defaultEntry: "hello_runtime.html",
    entryResourceMap: entryMap
  });
}
export { openDWebView, openDefaultDWebView };
//# sourceMappingURL=index.mjs.map
