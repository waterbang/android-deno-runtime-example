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
  send_buffer: { parameters: ["pointer", "usize"], result: "void" },
});

const Rust = dylib.symbols;

export default Rust;
