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
export { AppRuntime };
//# sourceMappingURL=AppRuntime.mjs.map
