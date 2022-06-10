/////////////////////////////
/// 这里是所有DwebView-js的网关
/////////////////////////////
import { WebSockets } from "./WebSockets";

export const connect = async () => {
  const rs = new WebSockets();
  await rs.connect();
};
