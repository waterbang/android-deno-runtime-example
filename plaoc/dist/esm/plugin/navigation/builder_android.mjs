import { BfcsNavigator } from "./BfcsNavigator.mjs";
const builder = () => {
  const currentInfo = JSON.parse(navigation.navigator_ffi.init());
  return new BfcsNavigator(currentInfo.info, currentInfo.parent, navigation.navigator_ffi);
};
export { builder as default };
//# sourceMappingURL=builder_android.mjs.map
