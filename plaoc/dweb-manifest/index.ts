import { IMetaData, Manifest, router } from "./manifest";
export type { IMetaData, Manifest, router };
export class MetaData {
  manifest: Manifest;
  router: router[];
  whitelist: string[];
  baseUrl: string;
  constructor(metaData: IMetaData) {
    this.manifest = metaData.manifest;
    this.router = metaData.router;
    this.whitelist = metaData.whitelist;
    // 生成DwebView地址
    this.baseUrl = `https://${metaData.manifest.dwebId}.dweb`;
  }
}
