export declare class AppRuntime {
    app_root: string | URL | undefined;
    constructor(app_root: string);
    inker(spe: string): runtime.TLinker;
    import(url: URL): void;
}
export declare class ManifestEntry {
    url: null;
    constructor(url: string);
    getUrl(): null;
}
