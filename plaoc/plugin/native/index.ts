/// <reference lib="dom" />
import { dwebPlugin } from "../dweb-plugin";

export class DWebView extends dwebPlugin {
  constructor() {
    super();
  }
}

export class OpenScanner extends dwebPlugin {
  constructor() {
    super();
  }
}

customElements.define("dweb-view", DWebView);
customElements.define("dweb-scanner", OpenScanner);
