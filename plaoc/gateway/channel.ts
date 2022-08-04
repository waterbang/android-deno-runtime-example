/// 负责创建Dwebview-js 跟Deno-js 通信的通道

import "@bfsx/typings";

/**
 * 这是临时的策略，因为rust_v8 的 v8动态链接库(aarch64-linux-android)在 deno:v1.21.1已经停止编译。
 * 但是 deno_ffi的 static function 参数却是在deno:v.1.23.2才更新，因此能力有限无法编译deno_ffi 的function参数。
 * 也就导致了流程 dwebview-js --fetch--> kotlin --ffi--> rust --ffi--> deno-js
 * 临时改变为 dwebview-js --fetch--> kotlin --http--> deno-js
 * 回来的逻辑是一样的：deno-js --ffi--> kotlin --evaljs--> dwebview-js(dispashByte,dispashString)
 */

export const createChannel = async () => {
  try {
    const server = Deno.listenDatagram({ port: 8080, transport: "udp" });
    console.log(`Access it at:  http://localhost:8080/`, server);
    //   for await (const conn of server) {
    //     (async () => {
    //       const httpConn = Deno.serveHttp(conn);
    //       try {
    //         for await (const { respondWith } of httpConn) {
    //           // Placeholder for some calculations or requests from other services
    //           // This makes the difference
    //           await respondWith(
    //             new Response("hello world", {
    //               status: 200,
    //             })
    //           );
    //         }
    //       } catch (error) {
    //         // This will be called for the error: "Http: connection closed before message completed"
    //         console.warn("Error", error);
    //       }
    //     })();
    //   }
  } catch (error) {
    // Note: This is not called for the error: "Http: connection closed before message completed"
    console.warn("Error", error);
  }
};
