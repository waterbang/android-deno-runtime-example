import { getExtension } from "../util/common";
import { DWebview } from "./module/DWebview";
import { FileModule } from "./module/File";
import { ScriptModule } from "./module/Script";

export class AppRuntime {
  app_root!: string;
  appId!: string;
  constructor(appId: string, app_root: string) {
    this.app_root = app_root;
    this.appId = appId;
  }
  inker(): runtime.TLinker {
    if (this.app_root === "node:bnrtc") {
      return new ScriptModule("code", "node:bnrtc");
    }
    // 如果是html
    if (getExtension(this.app_root) == "html") {
      return new DWebview(this.appId);
    }
    if (this.app_root.startsWith("File:///")) {
      return new FileModule(
        new URL(this.app_root, `https://${this.appId}.dweb`)
      );
    }
    return `https://${this.appId}.dweb`;
  }

  // const scriptUrl = worker.module_loader({
  //   add: (a: number, b: number) => {
  //     return a + b;
  //   },
  //   egg: () => {
  //     console.log("咯咯哒");
  //   },
  // });
  // const obj = new Worker(scriptUrl);
  // console.log(obj);
  // worker.injectFFI({
  //   op_fs_read: (path) => {
  //     fs.read(new URL(path, app_root));
  //   },
  // });
  import(url: URL) {}
}

export class ManifestEntry {
  url = null;
  constructor(url: string) {
    url;
  }
  public getUrl() {
    return this.url;
  }
}
