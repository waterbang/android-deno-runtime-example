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

// core/#bfsp.ts
var bfsp_default = defineConfig((info) => {
  const config = {
    name: "@bfsx/core",
    exports: {
      ".": "./index.ts"
    },
    deps: ["@bfsx/typings", "@bfsx/dweb-manifest"],
    profiles: ["android"],
    packageJson: {
      license: "MIT",
      author: "@bfchain",
      version: "0.0.1",
      private: false,
      dependencies: {},
      devDependencies: {}
    },
    tsConfig: {
      compilerOptions: {
        lib: ["ES2020", "DOM"]
      }
    }
  };
  return config;
});

// plugin/#bfsp.ts
var bfsp_default2 = defineConfig((info) => {
  const config = {
    name: "@bfsa/plugin",
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

// typings/#bfsp.ts
var bfsp_default3 = defineConfig((info) => {
  const config = {
    name: "@bfsx/typings",
    exports: {
      ".": "./index.ts"
    },
    packageJson: {
      license: "MIT",
      author: "@bfchain",
      version: "0.0.1",
      private: false
    }
  };
  return config;
});

// dweb/#bfsp.ts
var bfsp_default4 = defineConfig((info) => {
  const config = {
    name: "@bfsx/dweb",
    exports: {
      ".": "./index.ts"
    },
    packageJson: {
      license: "MIT",
      author: "@bfchain",
      version: "0.0.1",
      private: false
    }
  };
  return config;
});

// #bfsw.ts
var bfsw_default = defineWorkspace(() => {
  const config = {
    projects: [bfsp_default, bfsp_default2, bfsp_default4, bfsp_default3]
  };
  return config;
});
export {
  bfsw_default as default
};
