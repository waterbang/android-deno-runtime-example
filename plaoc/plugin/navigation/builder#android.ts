import { BfcsNavigator } from "./BfcsNavigator";

const builder = () => {
  const currentInfo = JSON.parse(navigation.navigator_ffi.init());
  return new BfcsNavigator(
    currentInfo.info,
    currentInfo.parent,
    navigation.navigator_ffi
  );
};
export default builder;
