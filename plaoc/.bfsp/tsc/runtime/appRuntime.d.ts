export declare class AppRuntime {
    app_root: string;
    appId: string;
    constructor(appId: string, app_root: string);
    inker(): Runtime.TLinker;
    import(url: URL): void;
}
export declare class ManifestEntry {
    url: null;
    method: string;
    contentType: string;
    constructor(url: string, method?: Mathod, contentType?: string);
    getUrl(): null;
}
export declare enum Mathod {
    GET = "GET",
    POST = "POST",
    DELETE = "DELETE",
    PUT = "PUT"
}
