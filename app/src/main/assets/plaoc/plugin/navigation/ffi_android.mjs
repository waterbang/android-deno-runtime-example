import { EvtOut } from "../common/EvtOut.mjs";
import { deno } from "../../deno/index.mjs";
const navigator_ffi = {};
navigator_ffi.init = function init() {
  let code;
  return JSON.stringify({
    scannerData: async () => {
      await deno.callFunction("navigatorPush");
    },
    parent: "\u54C8\u54C8" + code
  });
};
navigator_ffi.push = function push(nid, route) {
  return true;
};
navigator_ffi.checkout;
navigator_ffi.onActivated = new EvtOut();
navigator_ffi.onUnActivated = new EvtOut();
export { navigator_ffi };
//# sourceMappingURL=ffi_android.mjs.map
