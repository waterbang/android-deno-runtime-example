class BfcsKeyboard extends HTMLElement {
  constructor() {
    super();
    this._ffi = virtual_keyboard;
    this.setAttribute("hidden", "");
  }
  connectedCallback() {
    if (this.hasAttribute("for") && this.getAttribute("for")?.length) {
      this.$element = document.querySelector("#" + this.getAttribute("for"));
      this.$element.dispatchEvent(new CustomEvent("focus"));
      this.$element.dispatchEvent(new CustomEvent("blur"));
      this.$element.addEventListener("focus", () => {
        this.removeAttribute("hidden");
      });
      this.$element.addEventListener("blur", () => {
        this.setAttribute("hidden", "");
      });
    }
  }
  disconnectedCallback() {
    this.$element.removeEventListener("focus", () => {
    });
    this.$element.removeEventListener("blur", () => {
    });
  }
  getSafeArea() {
    return new Promise((resolve, reject) => {
      const safeArea = JSON.parse(this._ffi.getSafeArea());
      resolve(safeArea);
    });
  }
  getHeight() {
    return new Promise((resolve, reject) => {
      const height = this._ffi.getHeight();
      resolve(height);
    });
  }
  getOverlay() {
    return new Promise((resolve, reject) => {
      const overlay = this._ffi.getOverlay();
      resolve(overlay);
    });
  }
  toggleOverlay() {
    return new Promise((resolve, reject) => {
      this._ffi.toggleOverlay(0);
      resolve();
    });
  }
  show() {
    return new Promise((resolve, reject) => {
      this._ffi.show();
      resolve();
    });
  }
  syncShow() {
  }
  hide() {
    return new Promise((resolve, reject) => {
      this._ffi.hide();
      resolve();
    });
  }
  syncHide() {
  }
  static get observedAttributes() {
    return ["overlay", "hidden"];
  }
  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName === "overlay") {
      if (this.hasAttribute(attrName)) {
        this._ffi.toggleOverlay(1);
      }
    } else if (attrName === "hidden") {
      if (this.hasAttribute(attrName)) {
        if (this.hasAttribute("sync")) {
          this.syncHide();
        } else {
          this.hide();
        }
      } else {
        if (this.hasAttribute("sync")) {
          this.syncShow();
        } else {
          this.show();
        }
      }
    }
  }
}
export { BfcsKeyboard };
//# sourceMappingURL=bfcsKeyboard_android.mjs.map
