export * from "./plugin/index";
import { openDWebView } from "./runtime/installApp";
import { openScanner } from "./plugin/scanner/index";

// export function openDWebView() {
//   installApp({
//     id: "bMr9vohVtvBvWRS3p4bwgzSMoLHTPHSvVj",
//     name: "defaultApp",
//     versionCode: 1,
//     minBfsVersionCode: 1,
//     defaultEntry: "app/bfchain.dev/index.html",
//   });
// }
openDWebView({
  id: "bMr9vohVtvBvWRS3p4bwgzSMoLHTPHSvVj",
  name: "defaultApp",
  versionCode: 1,
  minBfsVersionCode: 1,
  defaultEntry: "hello_runtime.html",
});

export { openDWebView, openScanner };
