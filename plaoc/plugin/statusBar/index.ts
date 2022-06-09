export class StatusBar {
  /**
   * 设置状态栏颜色（透明度）
   * @param colorHex
   * @param DarkIcon
   */
  setStatusBarColor(colorHex: string, DarkIcon: statusBar.EDarkIcons) {}

  /**
   * 设置状态栏是否可见
   * @param visible 0
   */
  toggleStatusBarVisible(visible: statusBar.boolInt) {}

  toggleStatusBarOverlay(isOverlay: statusBar.boolInt) {}
}
