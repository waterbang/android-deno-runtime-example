import { BfcsNavigator } from "./BfcsNavigator";
declare global {
    namespace navigation {
        const ffi: BfcsNavigator.FFI;
    }
}
