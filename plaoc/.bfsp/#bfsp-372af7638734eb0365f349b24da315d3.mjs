// #bfsp.ts
import { defineConfig } from "@bfchain/pkgm-bfsp";
var bfsp_default = defineConfig((info) => {
  const config = {
    name: "plaoc",
    exports: {
      ".": "./index.ts"
    },
    packageJson: {
      license: "MIT",
      author: "mac",
      rootDir: "./"
    }
  };
  return config;
});
export {
  bfsp_default as default
};
