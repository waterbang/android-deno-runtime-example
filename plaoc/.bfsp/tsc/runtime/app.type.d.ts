import { FileModule } from "./module/File";
import { ScriptModule } from "./module/Script";
import { DWebview } from "./module/DWebview";
import { ManifestEntry } from "./AppRuntime";
declare global {
    namespace runtime {
        interface ManifestApp {
            id: string;
            name: string;
            versionCode: number;
            minBfsVersionCode: number;
            defaultEntry: string;
            entryResourceMap: Map<string, ManifestEntry>;
        }
        type TLinker = ScriptModule | FileModule | DWebview | String;
        interface ILinker {
            script: ScriptModule;
            file: FileModule;
            dwebview: DWebview;
            url: string;
        }
        type module_fn = {
            [fn: string]: Function;
        };
    }
}
