import { BfcsNavigator } from "./BfcsNavigator";
declare global {
  namespace navigation {
    const ffi: BfcsNavigator.FFI;
  }
}
// declare const navigator_ffi: import("./BfcsNavigator").BfcsNavigator.FFI;
