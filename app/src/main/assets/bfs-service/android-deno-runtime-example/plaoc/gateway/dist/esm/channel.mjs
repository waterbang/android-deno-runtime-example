const createChannel = async () => {
  const server = Deno.listen({ port: 8080 });
  console.log(`HTTP webserver running.  Access it at:  http://localhost:8080/`);
  try {
    for await (const conn of server) {
      (async () => {
        const httpConn = Deno.serveHttp(conn);
        try {
          for await (const { respondWith } of httpConn) {
            await respondWith(new Response("hello world", {
              status: 200
            }));
          }
        } catch (error) {
          console.warn("Error", error);
        }
      })();
    }
  } catch (error) {
    console.warn("Error", error);
  }
};
export { createChannel };
//# sourceMappingURL=channel.mjs.map
