import { EvtOut } from "../common/EvtOut.mjs";
import { Deno } from "../../deno/index.mjs";
const deno = new Deno();
const navigator_ffi = {};
navigator_ffi.init = function init() {
  console.log("navigator-> init");
  let code;
  (async function() {
    code = await deno.callFunction("openScanner");
    console.log("xixixixixixixixixi", JSON.stringify(code));
  })();
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
