export * from "./plugin/index";
import { getWebSocket } from "./gateway";
import { ManifestEntry } from "./runtime/AppRuntime";
import { installApp } from "./runtime/installApp";
// getWebSocket(); // 初始化连接BFS后端

const entryMap: Map<string, ManifestEntry> = new Map();
const DwebviewEntry = new ManifestEntry("dwebview");
const copyEntry = new ManifestEntry("./copy.cjs");
entryMap.set("dwebview", DwebviewEntry);
entryMap.set("./copy.cjs", copyEntry);

installApp({
  id: "bMr9vohVtvBvWRS3p4bwgzSMoLHTPHSvVj",
  name: "defaultApp",
  versionCode: 1,
  minBfsVersionCode: 1,
  defaultEntry: "./index.html",
  entryResourceMap: entryMap,
});
