class MetaData {
  manifest: Data.Manifest;
  router: Data.router[];
  whitelist?: string[];
  baseUrl?: string;
  constructor(metaData: Data.IMetaData) {
    this.manifest = metaData.manifest;
    this.router = metaData.router;
    this.whitelist = metaData.whitelist;
    // 生成DwebView地址
    this.baseUrl = `https://${metaData.manifest.dwebId}.dweb`;
  }
}

export { MetaData };
