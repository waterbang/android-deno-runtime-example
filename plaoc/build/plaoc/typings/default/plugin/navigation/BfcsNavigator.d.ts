import { EvtOut } from "../common/EvtOut";
export declare class BfcsNavigator<R extends Route = Route> {
    #private;
    /**当前导航器的信息 */
    readonly info: BfcsNavigator.NavigatorInfo;
    /**父级导航器的公开信息 */
    readonly parentInfo: BfcsNavigator.NavigatorInfo | undefined;
    /**
     * Foreign Function Interface
     */
    private _ffi;
    constructor(
    /**当前导航器的信息 */
    info: BfcsNavigator.NavigatorInfo, 
    /**父级导航器的公开信息 */
    parentInfo: BfcsNavigator.NavigatorInfo | undefined, 
    /**
     * Foreign Function Interface
     */
    _ffi: BfcsNavigator.FFI);
    init(): string;
    /**
     * 当前存有的 route 个数
     */
    get length(): number;
    /**
     * 根据下标读取路由
     */
    at(index: number): R | undefined;
    /**
     * 不能连续 push 重复的 route
     * @param route
     */
    push(route: R): boolean;
    get onPush(): import("../common/EvtOut").Evt<{
        route: R;
    }>;
    /**
     * 返回真正 pop 出来的数量
     * @param count
     */
    pop(count?: number): number;
    get onPop(): import("../common/EvtOut").Evt<{
        route: R;
    }>;
    /**
     * 替代当前的路由栈中最后一个
     * 不能连续 replace 重复的 route
     * @param route
     */
    replace(route: R, at?: number): boolean;
    get onReplace(): import("../common/EvtOut").Evt<{
        newRoute: R;
        oldRoute: R;
    }>;
    /**
     * 创新一个新的导航器
     * @param opts
     */
    fork(opts: BfcsNavigator.ForkOptions): BfcsNavigator | undefined;
    get onFork(): import("../common/EvtOut").Evt<{
        newNavigator: BfcsNavigator<Closeable>;
        fromNavigator: BfcsNavigator<Closeable> | null;
    }>;
    /**
     * 切换导航器，切换出来后，当前 navigator 就不能再操作
     * 只能切换自己 fork 出来的子路由 或者 自身
     *
     * 如果无权切换，那么会返回 false
     */
    checkout(navigator: BfcsNavigator): boolean;
    get onActivated(): import("../common/EvtOut").Evt<{
        fromNavigator: BfcsNavigator<Closeable>;
        toNavigator: BfcsNavigator<Closeable>;
    }>;
    /**
     * 销毁导航器
     * 只能销毁自己 fork 出来的子路由 或者 自身
     *
     * 如果无权切换，那么会返回 false
     * @param navigator
     */
    destroy(navigator: BfcsNavigator, reason?: unknown): boolean;
    get onDestroy(): import("../common/EvtOut").Evt<{
        reason?: unknown;
    }>;
}
declare type Closeable = string | number | {
    [key: string]: Closeable;
};
declare type Route = Closeable;
export declare namespace BfcsNavigator {
    type FFI = {
        init(): string;
        push(nid: number, route: Route): boolean;
        pop(nid: number, count: number): number;
        replace(nid: number, at: number, newRoute: Route): boolean;
        fork(nid: number, data: Closeable): number;
        checkout(nid: number, toNid: number): boolean;
        destroy(nid: number, targetNid: number): boolean;
        onActivated: EvtOut<{
            fromNid: number;
            toNid: number;
        }>;
        onUnActivated: EvtOut<{
            fromNid: number;
            toNid: number;
        }>;
    };
    type NavigatorInfo = Readonly<{
        nid: number;
        data: Closeable;
    }>;
    type ForkOptions = {
        data: Closeable;
    };
}
export {};
