export const metaData = {
  router: [
    {
      url: "/getBlockInfo",
      header: {
        method: "get",
        contentType: "application/json",
      },
    },
    {
      url: "/getBlockHigh",
      header: {
        method: "get",
        contentType: "application/json",
        StatusCode: 200,
      },
    },
    {
      url: "/hello_runtime.html",
      header: {
        contentType: "text/plain",
        StatusCode: 200,
      },
    },
    {
      url: "/app/bfchain.dev/index.html",
      header: {
        contentType: "text/plain",
        StatusCode: 200,
      },
    },
  ],
  // // 这里配置的白名单将不被拦截
  whitelist: ["https://unpkg.com"],
};
