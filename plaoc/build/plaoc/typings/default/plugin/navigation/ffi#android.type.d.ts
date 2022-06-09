import { BfcsNavigator } from "./BfcsNavigator";
declare global {
    namespace navigation {
        const navigator_ffi: BfcsNavigator.FFI;
    }
}
