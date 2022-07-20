import { defineConfig } from "@bfchain/pkgm-bfsp";
export default defineConfig((info) => {
  const config: Bfsp.UserConfig = {
    name: "@bfsx/core",
    exports: {
      ".": "./index.ts",
    },
    deps: ["@bfsa/typings", "@bfsa/dweb-manifest"],
    profiles: ["android"],
    packageJson: {
      license: "MIT",
      author: "@bfchain",
      version: "0.0.1",
      private: false,
      dependencies: {},
      devDependencies: {},
    },
    tsConfig: {
      compilerOptions: {
        lib: ["ES2020", "DOM"],
      },
    },
  };
  return config;
});
