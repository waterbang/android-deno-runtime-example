import { Manifest, Dwebview, IMetaData } from "./metadata.d";
class MetaData {
  manifest: Manifest;
  dwebview: Dwebview[];
  whitelist?: string[];
  baseUrl?: string;
  constructor(metaData: IMetaData) {
    this.manifest = metaData.manifest;
    this.dwebview = metaData.dwebview;
    this.whitelist = metaData.whitelist;
    // 生成DwebView地址
    this.baseUrl = `https://${metaData.manifest.dwebId}.dweb`;
  }
}

export { MetaData };
