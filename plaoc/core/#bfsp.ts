import { defineConfig } from "@bfchain/pkgm-bfsp";
export default defineConfig((info) => {
  const config: Bfsp.UserConfig = {
    name: "@bfsx/core",
    exports: {
      ".": "./index.ts",
    },
    profiles: ["android"],
    packageJson: {
      license: "MIT",
      author: "@bfchain",
      version: "0.0.2",
      private: false,
      dependencies: {},
      devDependencies: {
        "@bfsx/metadata": "0.0.2",
        "@bfsx/typings": "0.0.2",
      },
    },
    tsConfig: {
      compilerOptions: {
        lib: ["ES2020", "DOM"],
      },
    },
  };
  return config;
});
