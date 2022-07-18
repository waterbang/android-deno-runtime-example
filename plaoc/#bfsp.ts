import { defineConfig } from "@bfchain/pkgm-bfsp";
export default defineConfig((info) => {
  const config: Bfsp.UserConfig = {
    name: "bfsa",
    exports: {
      ".": "./index.ts",
    },
    profiles: ["android"],
    packageJson: {
      license: "MIT",
      author: "mac",
      dependencies: {},
      devDependencies: {},
    },
  };
  return config;
});
