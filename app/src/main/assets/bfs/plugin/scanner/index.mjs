import { callDeno } from "../../deno/android.fn.mjs";
import { deno } from "../../deno/index.mjs";
const openScanner = () => {
  return new Promise((resolve, reject) => {
    deno.callFunction(callDeno.openScanner);
  });
};
export { openScanner };
//# sourceMappingURL=index.mjs.map
