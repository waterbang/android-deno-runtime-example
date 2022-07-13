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

const libName = `librust_lib.${libSuffix}`;

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
