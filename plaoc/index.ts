export * from "./plugin/index";
import { getWebSocket } from "./gateway";
import { installApp } from "./runtime/installApp";
const webSockets = getWebSocket();
installApp({
  id: "1.1.1",
  name: "name",
  versionCode: 1,
  minBfsVersionCode: 1,
  defaultEntry: "/index.html",
  entryResourceMap: new Map(),
});
