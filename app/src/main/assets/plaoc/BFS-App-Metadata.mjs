const metaData = {
  router: [
    {
      url: "/getBlockInfo",
      header: {
        method: "get",
        contentType: "application/json"
      }
    },
    {
      url: "/getBlockHigh",
      header: {
        method: "get",
        contentType: "application/json",
        StatusCode: 200
      }
    },
    {
      url: "/hello_runtime.html",
      header: {
        contentType: "text/plain",
        StatusCode: 200
      }
    },
    {
      url: "/app/bfchain.dev/index.html",
      header: {
        contentType: "text/plain",
        StatusCode: 200
      }
    }
  ],
  whitelist: ["https://unpkg.com"]
};
export { metaData };
//# sourceMappingURL=BFS-App-Metadata.mjs.map
