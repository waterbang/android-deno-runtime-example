import { DWebview } from "./module/DWebview";
import { FileModule } from "./module/File";
import { ScriptModule } from "./module/Script";

export class AppRuntime {
  app_root: string | URL | undefined;
  constructor(app_root: string) {
    app_root;
  }
  inker(spe: string): runtime.TLinker {
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
