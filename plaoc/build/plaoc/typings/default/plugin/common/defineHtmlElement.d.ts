export declare const defineHtmlElement: <T extends {}>(names: {
    tag_name: string;
    tagName: string;
}, apis: T, lifecycle: {
    onCreate: () => unknown;
}) => {
    new (): HTMLElement;
    prototype: HTMLElement;
};
