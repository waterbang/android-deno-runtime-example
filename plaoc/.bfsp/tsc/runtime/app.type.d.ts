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
    }
}
export declare class ManifestEntry {
    url: null;
    constructor(url: string);
    getUrl(): null;
}
