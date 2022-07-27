import { MetaData } from "../../../android-deno-runtime-example/plaoc/metadata/dist/esm/index.mjs";
import { metaData } from "./BFS-Metadata.mjs";
import { openDWebView } from "../../../android-deno-runtime-example/plaoc/core/dist/esm/index.mjs";

try {
openDWebView(new MetaData(metaData));
} catch(e) {
 console.log(e)
}
//# sourceMappingURL=index.mjs.map
// bfs-service/vue/plaoc-ts/bfs-serivce/index.mjs