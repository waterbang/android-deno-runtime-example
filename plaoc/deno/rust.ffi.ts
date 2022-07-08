// your OS.
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
console.log("import.meta.url: %s", import.meta.url);
console.log("you OS: ", libSuffix);
console.log("Deno Apis: %o", JSON.stringify(Object.keys(Deno)));

function stringToArrayBuffer(msg: string): any {
  const reader = new FileReader();
  return reader.readAsArrayBuffer(new Blob([msg]));
}

const libName = `../../libs/arm64-v8a/librust_lib.${libSuffix}`;

try {
  const dylib = Deno.dlopen(libName, {
    add: { parameters: ["isize", "isize"], result: "isize" },
  } as const); // Call the symbol `add`
  const result = dylib.symbols.add(35, 34); // 69

  console.log(`Result from external addition of 35 and 34: ${result}`);
} catch (e) {
  console.log("err:", e);
}

export {};
