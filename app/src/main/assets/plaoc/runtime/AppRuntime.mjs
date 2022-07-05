import { getExtension } from "../util/common.mjs";
import { DWebview } from "./module/DWebview.mjs";
import { FileModule } from "./module/File.mjs";
import { ScriptModule } from "./module/Script.mjs";
class AppRuntime {
  constructor(appId, app_root) {
    this.app_root = app_root;
    this.appId = appId;
  }
  inker() {
    console.log("inker:", this.app_root, getExtension(this.app_root) == "html");
    if (this.app_root === "node:bnrtc") {
      return new ScriptModule("code", "node:bnrtc");
    }
    if (getExtension(this.app_root) == "html") {
      return new DWebview(this.appId);
    }
    if (this.app_root.startsWith("File:///")) {
      return new FileModule(new URL(this.app_root, `https://${this.appId}.dweb`));
    }
    return `https://${this.appId}.dweb`;
  }
  import(url) {
  }
}
class ManifestEntry {
  constructor(url, method = Mathod.GET, contentType = "application/json") {
    this.url = null;
    this.method = "GET";
    this.contentType = "application/json";
  }
  getUrl() {
    return this.url;
  }
}
var Mathod = /* @__PURE__ */ ((Mathod2) => {
  Mathod2["GET"] = "GET";
  Mathod2["POST"] = "POST";
  Mathod2["DELETE"] = "DELETE";
  Mathod2["PUT"] = "PUT";
  return Mathod2;
})(Mathod || {});
export { AppRuntime, ManifestEntry, Mathod };
//# sourceMappingURL=AppRuntime.mjs.map
