import { BfcsNavigator } from "./BfcsNavigator.mjs";
import { navigator_ffi } from "./ffi_android.mjs";
const builder = () => {
  const currentInfo = JSON.parse(navigator_ffi.init());
  return new BfcsNavigator(currentInfo.info, currentInfo.parent, navigator_ffi);
};
export { builder as default };
//# sourceMappingURL=builder_android.mjs.map
