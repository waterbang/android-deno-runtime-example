export * from "./plugin/index";
import { getWebSocket } from "./gateway";
import { ManifestEntry } from "./runtime/AppRuntime";
import { installApp } from "./runtime/installApp";
///start
const entryMap: Map<string, ManifestEntry> = new Map();
const DwebviewEntry = new ManifestEntry("/getBlockInfo");
const copyEntry = new ManifestEntry("./copy.cjs");
entryMap.set("dwebview", DwebviewEntry);
entryMap.set("./copy.cjs", copyEntry);
///end
(async function () {
  await getWebSocket(); // 初始化连接BFS后端
})();

export function openDWebView() {
  installApp({
    id: "bMr9vohVtvBvWRS3p4bwgzSMoLHTPHSvVj",
    name: "defaultApp",
    versionCode: 1,
    minBfsVersionCode: 1,
    defaultEntry: "app/bfchain.dev/index.html",
    entryResourceMap: entryMap,
  });
}
export function openDefaultDWebView() {
  installApp({
    id: "bMr9vohVtvBvWRS3p4bwgzSMoLHTPHSvVj",
    name: "defaultApp",
    versionCode: 1,
    minBfsVersionCode: 1,
    defaultEntry: "hello_runtime.html",
    entryResourceMap: entryMap,
  });
}
