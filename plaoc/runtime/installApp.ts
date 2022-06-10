import { connect } from "../gateway/index";

export const installApp = async (app: runtime.ManifestApp) => {
  await createClient();
};

/**
 * 创建客户端
 */
async function createClient() {
  const client = await connect();
}
