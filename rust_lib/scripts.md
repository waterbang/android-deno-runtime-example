直接执行 main.rs

```shell
cargo +nightly run
```

编译出 android lib

```shell
rustup +nightly target add aarch64-linux-android
cargo +nightly build --target=aarch64-linux-android
```

修改默认编译器

```
rustup set default-host x86_64-pc-windows-msvc
rustup set default-host x86_64-pc-windows-gnu
```

设置环境变量

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
```
