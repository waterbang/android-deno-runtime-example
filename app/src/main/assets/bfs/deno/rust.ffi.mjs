
const [libPrefix, libSuffix] = {
  ios: ["lib", "dylib"],
  android: ["lib", "so"],
  windows: ["", "dll"],
}[Deno.build.os];

try {
  const dylib = Deno.dlopen(`${libPrefix}rust_lib.${libSuffix}`, {
     "add_i32": { parameters: ["i32", "i32"], result: "i32" }
  });
  const { add_i32 } = dylib.symbols;
  Deno.bench("add_i32()", () => {
    add_i32(1, 2);
  });
} catch (e) {
  console.log("err:", e);
}
// # sourceMappingURL=rust.ffi.mjs.map
