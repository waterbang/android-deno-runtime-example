const metaData = {
  router: [
    {
      url: "/getBlockInfo",
      header: {
        method: "get",
        contentType: "application/json",
        response: "https://62b94efd41bf319d22797acd.mockapi.io/bfchain/v1/getBlockInfo"
      }
    },
    {
      url: "/getBlockHigh",
      header: {
        method: "get",
        contentType: "application/json",
        StatusCode: 200,
        response: "https://62b94efd41bf319d22797acd.mockapi.io/bfchain/v1/getBlockInfo"
      }
    },
    {
      url: "/hello_runtime.html",
      header: {
        contentType: "text/plain",
        StatusCode: 200,
        response: "/hello_runtime.html"
      }
    },
    {
      url: "/app/bfchain.dev/index.html",
      header: {
        contentType: "text/plain",
        StatusCode: 200,
        response: "/app/bfchain.dev/index.html"
      }
    }
  ],
  whitelist: ["https://unpkg.com"]
};
export { metaData };
//# sourceMappingURL=BFS-App-Metadata.mjs.map
