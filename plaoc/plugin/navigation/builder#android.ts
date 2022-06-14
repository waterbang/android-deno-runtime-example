import { BfcsNavigator } from "./BfcsNavigator";
import { navigator_ffi } from "../navigation/ffi#android";

const builder = () => {
  const currentInfo = JSON.parse(navigator_ffi.init());
  return new BfcsNavigator(currentInfo.info, currentInfo.parent, navigator_ffi);
};
export default builder;
