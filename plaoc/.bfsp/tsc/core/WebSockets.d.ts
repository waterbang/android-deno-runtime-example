export declare class webSockets {
    webSockets: WebSocket;
    statusArr: {
        state: number;
        value: string;
    }[];
    registerUrl: string;
    constructor(url?: string);
    sendSubscriptionToBackEnd(body: webSocket.registerBody): Promise<any>;
    connect(body?: webSocket.registerBody): Promise<void>;
    socketChange(): (string | undefined)[];
    sendData(fun: string): void;
    /**
     *   关闭连接
     */
    closeConnect(): void;
}
