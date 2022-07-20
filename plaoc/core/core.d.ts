export namespace Runtime {
  export type DwebViewId = string;
  export interface IManifestApp {
    id: string;
    name: string;
    versionCode: number;
    minBfsVersionCode: number;
    defaultEntry: string;
    entryResourceMap?: Map<string, string>;
  }

  export type TModule_fn = {
    [fn: string]: Function;
  };
}
