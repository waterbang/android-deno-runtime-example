import { defineConfig } from "@bfchain/pkgm-bfsp";
export default defineConfig((info) => {
  const config: Bfsp.UserConfig = {
    name: "@bfsx/metadata",
    exports: {
      ".": "./index.ts",
    },
    packageJson: {
      license: "MIT",
      author: "@bfchain",
      version: "0.0.1",
      private: false,
    },
  };
  return config;
});
