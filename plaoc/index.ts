export * from "./plugin/index";
import { installApp } from "./runtime/installApp";
import "./deno/rust.ffi";

export function openDWebView() {
  installApp({
    id: "bMr9vohVtvBvWRS3p4bwgzSMoLHTPHSvVj",
    name: "defaultApp",
    versionCode: 1,
    minBfsVersionCode: 1,
    defaultEntry: "app/bfchain.dev/index.html",
  });
}
installApp({
  id: "bMr9vohVtvBvWRS3p4bwgzSMoLHTPHSvVj",
  name: "defaultApp",
  versionCode: 1,
  minBfsVersionCode: 1,
  defaultEntry: "hello_runtime.html",
});
