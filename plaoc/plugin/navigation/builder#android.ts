import { BfcsNavigator } from "./BfcsNavigator";

const builder = () => {
  const currentInfo = JSON.parse(navigation.ffi.init());
  return new BfcsNavigator(
    currentInfo.info,
    currentInfo.parent,
    navigation.ffi
  );
};
export default builder;
