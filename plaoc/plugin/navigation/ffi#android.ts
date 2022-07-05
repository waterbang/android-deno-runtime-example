import { EvtOut } from "../common";
import { BfcsNavigator, Route } from "./BfcsNavigator";
import { deno } from "../../deno/index";

const navigator_ffi: BfcsNavigator.FFI = {} as BfcsNavigator.FFI;

navigator_ffi.init = function init() {
  let code;
  // (async function () {
  //   code =  deno.callFunction("openScanner");
  //   code =  deno.callFunction("openScanner");
  //   code =  deno.callFunction("openScanner");
  //   const el = window.document.querySelector("#navigator");
  //   el!.innerHTML += `<p>接收数据: ${code}</p>`;
  //   console.log("xixixixixixixixixi", JSON.stringify(code));
  // })();

  return JSON.stringify({
    scannerData: async () => {
      await deno.callFunction("navigatorPush");
    },
    parent: "哈哈" + code,
  });
};

navigator_ffi.push = function push(nid: number, route: Route) {
  return true;
};

navigator_ffi.checkout;

navigator_ffi.onActivated = new EvtOut();
navigator_ffi.onUnActivated = new EvtOut();

export { navigator_ffi };
