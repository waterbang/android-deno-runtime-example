import { defineWorkspace } from "@bfchain/pkgm-bfsw";

import core from "./core/#bfsp";
import plugin from "./plugin/#bfsp";
import typings from "./typings/#bfsp";
import metadata from "./metadata/#bfsp";
import gateway from "./gateway/#bfsp";

export default defineWorkspace(() => {
  const config: Bfsw.Workspace = {
    projects: [core, plugin, metadata, gateway, typings],
  };

  return config;
});
