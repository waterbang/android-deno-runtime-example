import { EvtOut } from "../common";

navigation.ffi.init = function init() {
  console.log("navigator-> init");
  return JSON.stringify({
    info: "22",
    parent: "哈哈",
  });
};

// navigation.ffi.setNavigationBarColor = () => {};

// navigation.navigator_ffi.pop = () => {};

navigation.ffi.onActivated = new EvtOut();
navigation.ffi.onUnActivated = new EvtOut();
