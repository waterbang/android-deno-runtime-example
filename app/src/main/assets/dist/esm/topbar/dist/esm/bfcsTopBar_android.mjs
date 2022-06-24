class BfcsTopBar extends HTMLElement {
  constructor() {
    super();
    this._ffi = top_bar;
    this._actionList = [];
  }
  connectedCallback() {
    let observer = new MutationObserver((mutations) => {
      this.collectActions();
    });
    observer.observe(this, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: [
        "disabled",
        "icon",
        "type",
        "description",
        "size",
        "source"
      ]
    });
    this.collectActions();
  }
  disconnectedCallback() {
  }
  back() {
    return new Promise((resolve, reject) => {
      this._ffi.back();
      resolve();
    });
  }
  toggleEnabled() {
    return new Promise((resolve, reject) => {
      this._ffi.toggleEnabled(0);
      resolve();
    });
  }
  getEnabled() {
    return new Promise((resolve, reject) => {
      const isEnabled = this._ffi.getEnabled();
      resolve(isEnabled);
    });
  }
  getTitle() {
    return new Promise((resolve, reject) => {
      const title = this._ffi.getTitle();
      resolve(title);
    });
  }
  setTitle(title) {
    return new Promise((resolve, reject) => {
      this._ffi.setTitle(title);
      resolve();
    });
  }
  hasTitle() {
    return new Promise((resolve, reject) => {
      const hasTitle = this._ffi.hasTitle();
      resolve(hasTitle);
    });
  }
  getOverlay() {
    return new Promise((resolve, reject) => {
      const isOverlay = this._ffi.getOverlay();
      resolve(isOverlay);
    });
  }
  toggleOverlay() {
    return new Promise((resolve, reject) => {
      this._ffi.toggleOverlay(0);
      resolve();
    });
  }
  getHeight() {
    return new Promise((resolve, reject) => {
      const height = this._ffi.getHeight();
      resolve(height);
    });
  }
  getColorInt(color = "#ffffff", opacity = 0.5) {
    return parseInt(color.slice(1), 16) + (opacity * 255 << 8 * 3);
  }
  getBackgroundColor() {
    return new Promise((resolve, reject) => {
      const color = this._ffi.getBackgroundColor();
      const colorHex = "#" + color.toString(16).slice(2);
      resolve(colorHex);
    });
  }
  setBackgroundColor(colorHex = "#ffffff") {
    return new Promise((resolve, reject) => {
      const opacity = this.getAttribute("opacity") ? parseFloat(this.getAttribute("opacity")) : 0.5;
      const color = this.getColorInt(colorHex, opacity);
      this._ffi.setBackgroundColor(color);
      resolve();
    });
  }
  getForegroundColor() {
    return new Promise((resolve, reject) => {
      const color = this._ffi.getForegroundColor();
      const colorHex = "#" + color.toString(16).slice(2);
      resolve(colorHex);
    });
  }
  setForegroundColor(colorHex = "#ffffff") {
    return new Promise((resolve, reject) => {
      const opacity = this.getAttribute("opacity") ? parseFloat(this.getAttribute("opacity")) : 0.5;
      const color = this.getColorInt(colorHex, opacity);
      this._ffi.setForegroundColor(color);
      resolve();
    });
  }
  getActions() {
    return new Promise((resolve, reject) => {
      this._actionList = JSON.parse(this._ffi.getActions());
      resolve(this._actionList);
    });
  }
  setActions() {
    return new Promise((resolve, reject) => {
      this._ffi.setActions(JSON.stringify(this._actionList));
      resolve();
    });
  }
  async collectActions() {
    this._actionList = [];
    this.querySelectorAll("dweb-top-bar-button").forEach((childNode) => {
      let icon = {
        source: "",
        type: "NamedIcon"
      };
      if (childNode.querySelector("dweb-icon")) {
        let $ = childNode.querySelector("dweb-icon");
        icon.source = $?.getAttribute("source") ?? "";
        icon.type = $?.hasAttribute("type") ? $.getAttribute("type") : "NamedIcon";
        icon.description = $?.getAttribute("description") ?? "";
        icon.size = $?.hasAttribute("size") ? $.getAttribute("size") : void 0;
      }
      const bid = childNode.getAttribute("bid");
      const onClickCode = `document.querySelector('dweb-top-bar-button[bid="${bid}"]').dispatchEvent(new CustomEvent('click'))`;
      const disabled = childNode.hasAttribute("disabled") ? true : false;
      this._actionList.push({ icon, onClickCode, disabled });
    });
    await this.setActions();
  }
  static get observedAttributes() {
    return [
      "title",
      "disabled",
      "backgroudColor",
      "foregroundColor",
      "overlay",
      "opacity"
    ];
  }
  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName === "title") {
      this.setTitle(newVal);
    } else if (attrName === "backgroudColor") {
      this.setBackgroundColor(newVal);
    } else if (attrName === "foregroundColor") {
      this.setForegroundColor(newVal);
    } else if (attrName === "overlay") {
      if (this.hasAttribute(attrName)) {
        this._ffi.toggleOverlay(1);
      }
    } else if (attrName === "disabled") {
      if (this.hasAttribute(attrName)) {
        this._ffi.toggleEnabled(1);
      }
    }
  }
}
export { BfcsTopBar };
//# sourceMappingURL=bfcsTopBar_android.mjs.map
