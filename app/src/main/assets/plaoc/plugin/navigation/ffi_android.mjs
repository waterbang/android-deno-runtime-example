import { EvtOut } from "../common/EvtOut.mjs";
import { Deno } from "../../deno/index.mjs";
const deno = new Deno();
const navigator_ffi = {};
navigator_ffi.init = function init() {
  console.log("navigator-> init");
  deno.callFunction("openScanner");
  return JSON.stringify({
    info: "22",
    parent: "\u54C8\u54C8"
  });
};
navigator_ffi.onActivated = new EvtOut();
navigator_ffi.onUnActivated = new EvtOut();
export { navigator_ffi };
//# sourceMappingURL=ffi_android.mjs.map
