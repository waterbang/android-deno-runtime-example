import { EvtOut } from "../common";
import { BfcsNavigator } from "./BfcsNavigator";
import { Deno } from "../../deno/index";

const deno = new Deno();
const navigator_ffi: BfcsNavigator.FFI = {} as BfcsNavigator.FFI;

navigator_ffi.init = function init() {
  console.log("navigator-> init");
  deno.callFunction("openScanner");
  return JSON.stringify({
    info: "22",
    parent: "哈哈",
  });
};

// navigation.navigator_ffi.pop = () => {};

navigator_ffi.onActivated = new EvtOut();
navigator_ffi.onUnActivated = new EvtOut();

export { navigator_ffi };
