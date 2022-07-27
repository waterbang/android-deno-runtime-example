const createChannel = async () => {
    try {

 const server = Deno.listenDatagram({
    port: 0,
    transport: "udp"
   });
//      console.warn("xxxxx", parseInt(server.addr.port, 10).toString(16));

  for await (const conn of server) {
    serveHttp(conn);
  }
  async function serveHttp(conn) {
    const httpConn = Deno.serveHttp(conn);
    for await (const requestEvent of httpConn) {
      const body = `Your user-agent is:

${requestEvent.request.headers.get("user-agent") ?? "Unknown"}`;
      requestEvent.respondWith(new Response(body, {
        status: 200
      }));
    }
  }
     } catch(e) {
         console.log(e)
        }
};
export { createChannel };
//# sourceMappingURL=channel.mjs.map
