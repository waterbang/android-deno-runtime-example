class BfcsTopBarButton extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.setAttribute("bid", (Math.random() * Date.now()).toFixed(0));
  }
  disconnectedCallback() {
    this.removeEventListener("click", () => {
    });
  }
  static get observedAttributes() {
    return ["disabled"];
  }
  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName === "disabled" && oldVal !== newVal) {
      if (this.hasAttribute(attrName)) {
        this.setAttribute(attrName, "");
      } else {
        this.removeAttribute(attrName);
      }
    }
  }
}
export { BfcsTopBarButton };
//# sourceMappingURL=bfcsTopBarButton_android.mjs.map
