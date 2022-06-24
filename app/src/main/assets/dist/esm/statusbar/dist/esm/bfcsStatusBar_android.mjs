class BfcsStatusBar extends HTMLElement {
  constructor() {
    super();
    this._ffi = system_ui;
  }
  connectedCallback() {
    let observer = new MutationObserver((mutations) => {
      this.setStatusBarColor();
    });
    observer.observe(this, {
      subtree: true,
      childList: true,
      attributes: true
    });
    this.setStatusBarColor();
  }
  disconnectedCallback() {
  }
  async setStatusBarColor() {
    const childNode = this.querySelector("dweb-status-bar-color");
    if (childNode) {
      const colorHex = childNode.getAttribute("colorhex") ? childNode.getAttribute("colorhex") : void 0;
      const opacity = childNode.getAttribute("opacity") ? parseFloat(childNode.getAttribute("opacity")) : 0.5;
      const darkIcons = childNode.getAttribute("darkicons") ? parseInt(childNode.getAttribute("darkicons")) : 0;
      this._ffi.setStatusBarColor(this.getColorInt(colorHex, opacity), darkIcons);
    }
  }
  getColorInt(color = "#ffffff", opacity = 0.5) {
    return parseInt(color.slice(1), 16) + (opacity * 255 << 8 * 3);
  }
  getStatusBarVisible() {
    return new Promise((resolve, reject) => {
      let isVisible = this._ffi.getStatusBarVisible();
      resolve(isVisible);
    });
  }
  toggleStatusBarVisible() {
    return new Promise((resolve, reject) => {
      this._ffi.toggleStatusBarVisible(0);
      resolve();
    });
  }
  getStatusBarOverlay() {
    return new Promise((resolve, reject) => {
      let overlay = this._ffi.getStatusBarOverlay();
      resolve(overlay);
    });
  }
  toggleStatusBarOverlay() {
    return new Promise((resolve, reject) => {
      this._ffi.toggleStatusBarOverlay(0);
      resolve();
    });
  }
  static get observedAttributes() {
    return ["overlay", "hidden"];
  }
  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName === "overlay") {
      if (this.hasAttribute(attrName)) {
        this._ffi.toggleStatusBarOverlay(1);
      }
    } else if (attrName === "hidden") {
      if (this.hasAttribute(attrName)) {
        this.toggleStatusBarVisible();
      }
    }
  }
}
export { BfcsStatusBar };
//# sourceMappingURL=bfcsStatusBar_android.mjs.map
