import { BfcsNavigator } from "./BfcsNavigator.mjs";
const builder = () => {
  const currentInfo = JSON.parse(navigation.ffi.init());
  return new BfcsNavigator(currentInfo.info, currentInfo.parent, navigation.ffi);
};
export { builder as default };
//# sourceMappingURL=builder_android.mjs.map
