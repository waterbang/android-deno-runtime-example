import { DWebview } from "./module/DWebview.mjs";
import { FileModule } from "./module/File.mjs";
import { ScriptModule } from "./module/Script.mjs";
class AppRuntime {
  constructor(app_root) {
  }
  inker(spe) {
    if (spe === "node:bnrtc") {
      return new ScriptModule("code", "node:bnrtc");
    }
    if (spe.startsWith("./")) {
      return new FileModule(new URL(spe, this.app_root));
    }
    if (spe === "dwebview") {
      return new DWebview();
    }
    return `dweb://${spe}`;
  }
  import(url) {
  }
}
class ManifestEntry {
  constructor(url) {
    this.url = null;
  }
  getUrl() {
    return this.url;
  }
}
export { AppRuntime, ManifestEntry };
//# sourceMappingURL=AppRuntime.mjs.map
