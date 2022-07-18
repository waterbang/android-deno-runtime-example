import { getExtension } from "../util/common";
import { DWebView } from "./module/DWebView";
import { FileModule } from "./module/File";
import { ScriptModule } from "./module/Script";

export class AppRuntime {
  app_root!: string;
  appId!: string;
  constructor(appId: string, app_root: string) {
    this.app_root = app_root;
    this.appId = appId;
  }

  installRuntime(): Runtime.TLinker {
    console.log("inker:", this.app_root, getExtension(this.app_root) == "html");
    if (this.app_root === "node:bnrtc") {
      return new ScriptModule("code", "node:bnrtc");
    }
    // 如果是html
    if (getExtension(this.app_root) == "html") {
      return new DWebView(this.appId);
    }
    // 本地文件
    if (this.app_root.startsWith("File:///")) {
      return new FileModule(
        new URL(this.app_root, `https://${this.appId}.dweb`)
      );
    }
    return `https://${this.appId}.dweb`;
  }
}

export class ManifestEntry {
  url = null;
  method = "GET";
  contentType = "application/json";
  constructor(
    url: string,
    method: Mathod = Mathod.GET,
    contentType: string = "application/json"
  ) {
    url;
    method;
    contentType;
  }
  public getUrl() {
    return this.url;
  }
}

export enum Mathod {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PUT = "PUT",
}
