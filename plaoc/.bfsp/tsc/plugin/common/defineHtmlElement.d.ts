/**
 *
 * @param names
 * @param apis 挂上prototype
 * @param lifecycle 注入生命周期
 * @returns
 */
export declare const defineHtmlElement: <T extends {}>(names: {
    tag_name: string;
    tagName: string;
}, apis: T, lifecycle: {
    onCreate: () => unknown;
}) => {
    new (): HTMLElement;
    prototype: HTMLElement;
};
