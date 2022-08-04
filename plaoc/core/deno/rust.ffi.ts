// your OS.
import "@bfsx/typings";

let libSuffix = "";
switch (Deno.build.os) {
  case "windows":
    libSuffix = "dll";
    break;
  case "darwin":
    libSuffix = "dylib";
    break;
  default:
    libSuffix = "so";
    break;
}

const libName = `librust_lib.${libSuffix}`;

const dylib = Deno.dlopen(libName, {
  // deno_js向rust发送消息
  js_to_rust_buffer: { parameters: ["pointer", "usize"], result: "void" },
  // rust发送消息给deno_js
  rust_to_js_buffer: {
    parameters: ["pointer"],
    result: "pointer",
  },
  // deno_js 走这个ffi去执行kotlin 的evaljs通知dwebview-js
  eval_js: { parameters: ["pointer", "usize"], result: "void" },
  // store_function: { parameters: ["function"], result: "pointer" },
});

const Rust = dylib.symbols;

// Deno.core.recv(handleAsyncMsgFromRust);

// function handleAsyncMsgFromRust() {
//   // Callers should not call Deno.core.recv, use setAsyncHandler.
// }

// const rustCallback = new Deno.UnsafeCallback(
//   {
//     parameters: ["u8"],
//     result: "u8",
//   },
//   (value) => {
//     console.log("rustCallback:", rustCallback);
//     return value + 10;
//   }
// );

// function ptr(v: any) {
//   return Deno.UnsafePointer.of(v);
// }

// dylib.symbols.store_function(ptr(rustCallback));

const buffer = new TextEncoder().encode("Hello coming from Deno space");
const ret = dylib.symbols.rust_to_js_buffer(buffer);
console.log("dylib.symbols.rust_to_js_buffer(buffer):", ret);
export default Rust;
