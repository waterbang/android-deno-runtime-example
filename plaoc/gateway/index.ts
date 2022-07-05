/////////////////////////////
/// 这里是所有DwebView-js的网关
/////////////////////////////
export {};
/// 写错了，不能用这个
// let webSockets: WebSockets;
// /// 拿到全局的webSockets对象
// const getWebSocket = async (url?: string): Promise<WebSockets> => {
//   return new Promise(async (resolve, reject) => {
//     if (webSockets === undefined || url !== undefined) {
//       try {
//         webSockets = new WebSockets(url);
//         await webSockets.connect();
//       } catch (e) {
//         reject(e);
//       }
//     }
//     resolve(webSockets);
//   });
// };

// export { getWebSocket };
