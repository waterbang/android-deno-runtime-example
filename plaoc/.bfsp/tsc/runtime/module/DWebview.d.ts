export declare class DWebView {
    url: string;
    constructor(id: string);
    initAppMetaData(): void;
    onRequest(url: string): Promise<string>;
    activity(entry: string): void;
}
