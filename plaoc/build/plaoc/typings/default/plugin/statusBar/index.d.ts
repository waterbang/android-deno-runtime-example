import { EDarkIcons, visibleInt } from "./statusBar.type";
export declare class StatusBar {
    /**
     * 设置状态栏颜色（透明度）
     * @param colorHex
     * @param DarkIcon
     */
    setStatusBarColor(colorHex: string, DarkIcon: EDarkIcons): void;
    /**
     *
     */
    toggleStatusBarVisible(visible: visibleInt): void;
}
