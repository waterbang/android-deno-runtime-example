/// <reference lib="dom" />
export declare class EvtOut<T> {
    #private;
    emit(data: T): void;
    toAsyncGenerator(): Evt<T>;
}
export declare type Evt<T = unknown> = AsyncGenerator<Awaited<NonNullable<T>>, void, void>;
