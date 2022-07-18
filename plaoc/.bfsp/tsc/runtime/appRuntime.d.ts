export declare class AppRuntime {
    app_root: string;
    appId: string;
    constructor(appId: string, app_root: string);
    installRuntime(): Runtime.TLinker;
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
