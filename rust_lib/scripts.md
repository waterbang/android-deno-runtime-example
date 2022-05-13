### 基础rust项目命令
直接执行 main.rs

```shell
cargo +nightly run
```

编译出 android lib

```shell
rustup +nightly target add aarch64-linux-android
cargo +nightly build --target=aarch64-linux-android --release
```

修改默认编译器

```
rustup set default-host x86_64-pc-windows-msvc
rustup set default-host x86_64-pc-windows-gnu
```

### 如果遇到v8报错需要设置环境变量

```powershell
$env:RUSTY_V8_MIRROR="D:/dev\AndroidStudioProjects\RustEample\rust_lib\assets\rusty_v8_mirror\"
$env:RUSTY_V8_ARCHIVE="D:\dev\AndroidStudioProjects\RustEample\rust_lib\assets\rusty_v8_mirror\v0.42.0\rusty_v8_release_x86_64-pc-windows-msvc.lib"
$env:RUSTY_V8_ARCHIVE="D:\dev\AndroidStudioProjects\RustEample\rust_lib\assets\rusty_v8_mirror\v0.42.0\librusty_v8_release_aarch64-linux-android.a"
```

```cmd
set RUSTY_V8_MIRROR=D:\dev\AndroidStudioProjects\RustEample\rust_lib\assets\rusty_v8_mirror\
set RUSTY_V8_ARCHIVE=D:\dev\AndroidStudioProjects\RustEample\rust_lib\assets\rusty_v8_mirror\v0.42.0\rusty_v8_release_x86_64-pc-windows-msvc.lib
```
```bash
export RUSTY_V8_MIRROR="/mnt/d/dev/AndroidStudioProjects/RustEample/rust_lib/assets/rusty_v8_mirror/"
export RUSTY_V8_ARCHIVE="/mnt/d/dev/AndroidStudioProjects/RustEample/rust_lib/assets/rusty_v8_mirror/v0.42.0/librusty_v8_release_aarch64-linux-android.a"

export RUSTY_V8_ARCHIVE="/Users/mac/Desktop/waterbang/project/android-deno-runtime-example/rust_lib/assets/rusty_v8_mirror/v0.42.0/librusty_v8_release_aarch64-linux-android.a"
export RUSTY_V8_ARCHIVE="/Users/mac/Desktop/waterbang/project/android-deno-runtime-example/rust_lib/assets/rusty_v8_mirror/v0.42.0/librusty_v8_release_aarch64-apple-darwin.a"
```

### 修复`unable to find library -lgcc`的问题

网上有一种错误说法，其实只能让编译通过，实际是运行的时候会爆出错误：
```bash
cd /Users/kzf/Library/Android/sdk/ndk/24.0.8215888/toolchains/llvm/prebuilt/darwin-x86_64/lib64/clang/14.0.1/lib/linux/aarch64
echo "INPUT(-lunwind)" > libgcc.a

java.lang.UnsatisfiedLinkError: dlopen failed: cannot locate symbol "__emutls_get_address" referenced by "/data/app/~~xgQux0SWdH8NR7GLHyXCNg==/org.bfchain.rust.example-1rL1uIoeTHAxKOyHiDM32w==/base.apk!/lib/arm64-v8a/librust_lib.so"...
````

目前已知的解决方法就是把ndk锁在22版本以下