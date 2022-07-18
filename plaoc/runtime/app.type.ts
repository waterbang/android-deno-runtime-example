import { FileModule } from "./module/File";
import { ScriptModule } from "./module/Script";
import { DWebView } from "./module/DWebView";
import { ManifestEntry } from "./AppRuntime";
declare global {
  namespace Runtime {
    interface IManifestApp {
      id: string;
      name: string;
      versionCode: number;
      minBfsVersionCode: number;
      defaultEntry: string;
      entryResourceMap?: Map<string, ManifestEntry>;
    }
    type TLinker = ScriptModule | FileModule | DWebView | String;
    interface ILinker {
      script: ScriptModule;
      file: FileModule;
      dwebview: DWebView;
      url: string;
    }
    type TModule_fn = {
      [fn: string]: Function;
    };
  }
  namespace appData {
    interface metaData {
      baseUrl?: string;
      router: router[];
      whitelist: string[];
    }
    interface router {
      url: string;
      header: {
        method?: string;
        contentType?: string;
        response: string;
        StatusCode?: number;
      };
    }
  }
}
