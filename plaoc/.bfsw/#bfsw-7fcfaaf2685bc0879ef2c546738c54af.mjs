// ../../../../../../../usr/local/lib/node_modules/@bfchain/pkgm/node_modules/@bfchain/pkgm-bfsw/dist/main/src/index.mjs
var defineWorkspace = (cb) => {
  return cb();
};

// ../../../../../../../usr/local/lib/node_modules/@bfchain/pkgm/node_modules/@bfchain/pkgm-bfsp/dist/main/src/index.mjs
var defineConfig = (cb) => {
  return {
    ...cb({
      mode: {}.mode?.startsWith("prod") ? "production" : "development"
    }),
    relativePath: "./"
  };
};

// bfsp-wrapper:./core/#bfsp#
var bfsp_default = defineConfig((info) => {
  const config = {
    name: "@bfsx/core",
    exports: {
      ".": "./index.ts"
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
        "@bfsx/typings": "0.0.2"
      }
    },
    tsConfig: {
      compilerOptions: {
        lib: ["ES2020", "DOM"]
      }
    }
  };
  return config;
});

// bfsp-wrapper:/Users/mac/Desktop/waterbang/project/android-deno-runtime-example/plaoc/core/#bfsp.ts
var newDefault = Object.assign(bfsp_default ?? {}, { relativePath: "./core" });
var bfsp_default2 = newDefault;

// bfsp-wrapper:./plugin/#bfsp#
var bfsp_default3 = defineConfig((info) => {
  const config = {
    name: "@bfsx/plugin",
    exports: {
      ".": "./index.ts"
    },
    profiles: ["android"],
    packageJson: {
      license: "MIT",
      author: "@bfchain",
      version: "0.0.2",
      private: false,
      dependencies: {},
      devDependencies: {}
    }
  };
  return config;
});

// bfsp-wrapper:/Users/mac/Desktop/waterbang/project/android-deno-runtime-example/plaoc/plugin/#bfsp.ts
var newDefault2 = Object.assign(bfsp_default3 ?? {}, { relativePath: "./plugin" });
var bfsp_default4 = newDefault2;

// bfsp-wrapper:./typings/#bfsp#
var bfsp_default5 = defineConfig((info) => {
  const config = {
    name: "@bfsx/typings",
    exports: {
      ".": "./index.ts"
    },
    packageJson: {
      license: "MIT",
      author: "@bfchain",
      version: "0.0.2",
      private: false,
      devDependencies: {}
    },
    tsConfig: {
      compilerOptions: {}
    }
  };
  return config;
});

// bfsp-wrapper:/Users/mac/Desktop/waterbang/project/android-deno-runtime-example/plaoc/typings/#bfsp.ts
var newDefault3 = Object.assign(bfsp_default5 ?? {}, { relativePath: "./typings" });
var bfsp_default6 = newDefault3;

// bfsp-wrapper:./metadata/#bfsp#
var bfsp_default7 = defineConfig((info) => {
  const config = {
    name: "@bfsx/metadata",
    exports: {
      ".": "./index.ts"
    },
    profiles: ["android"],
    packageJson: {
      license: "MIT",
      author: "@bfchain",
      version: "0.0.2",
      private: false
    }
  };
  return config;
});

// bfsp-wrapper:/Users/mac/Desktop/waterbang/project/android-deno-runtime-example/plaoc/metadata/#bfsp.ts
var newDefault4 = Object.assign(bfsp_default7 ?? {}, { relativePath: "./metadata" });
var bfsp_default8 = newDefault4;

// #bfsw.ts
var bfsw_default = defineWorkspace(() => {
  const config = {
    projects: [bfsp_default2, bfsp_default4, bfsp_default8, bfsp_default6]
  };
  return config;
});
export {
  bfsw_default as default
};
