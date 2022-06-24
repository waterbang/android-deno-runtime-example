export declare class DWebview {
    url: string;
    constructor(id: string);
    onRequest(url: string): Promise<string>;
    activity(entry: string): void;
}
