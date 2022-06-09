export class AppRuntime {
  constructor(app_root: string) {
    const worker = new Worker("");
    // worker.module_loader = {
    //   linker(spe: string) {
    //     if (spe === "node:bnrtc") {
    //       return new ScriptModule("code", "node:bnrtc");
    //     }
    //     if (spe.startsWith("./")) {
    //       return new FileModule(new URL(spe, app_root));
    //     }
    //     if (spe === "dwebview") {
    //       return DWebviewModule;
    //     }
    //   },
    // };
    // worker.injectFFI({
    //   op_fs_read: (path) => {
    //     fs.read(new URL(path, app_root));
    //   },
    // });
  }
  import(url: URL) {}
}

// class Worker {
//   injectFFI() {

//   }
//   module_loader() {

//   }
// }
