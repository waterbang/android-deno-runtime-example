export declare class DWebview {
    url: URL | undefined;
    constructor();
    onRequest(url: string): Promise<string>;
    activity(): void;
}
