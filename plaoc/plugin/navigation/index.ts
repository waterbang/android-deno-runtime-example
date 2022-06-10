import builder from "./builder#android";
import { defineHtmlElement } from "../common";
import { BfcsNavigator } from "./BfcsNavigator";

export { BfcsNavigator };

export const HTMLDWebNavigatorElement = defineHtmlElement(
  { tagName: "DWebNavigator", tag_name: "dweb-navigator" },
  builder(),
  {
    onCreate() {
      console.log("DWebNavigator is create");
    },
  }
);
