#![cfg(target_os = "android")]

use android_logger::Config;
use log::Level;
// 引用 jni 库的一些内容，就是上面添加的 jni 依赖
use crate::module_loader::AssetsModuleLoader;
use crate::my_deno_runtime::bootstrap_deno_runtime;
use jni::{
    objects::{JObject, JString, JValue},
    JNIEnv,
};
use std::sync::Arc;
use std::ptr::NonNull;

/// 初始化的一些操作
#[no_mangle]
#[tokio::main]
pub async extern "system" fn Java_org_bfchain_rust_example_DenoService_initDeno(
    env: JNIEnv,
    _context: JObject,
    jasset_manager: JObject,
) {
    android_logger::init_once(
        Config::default()
            .with_min_level(Level::Debug)
            .with_tag("myrust::BFS"),
    );
    log::info!("启动BFS后端");
    let asset_manager_ptr = unsafe {
        ndk_sys::AAssetManager_fromJava(env.get_native_interface(), jasset_manager.cast())
    };
    bootstrap_deno_runtime(
        Arc::new(AssetsModuleLoader::from_ptr(
            NonNull::new(asset_manager_ptr).unwrap(),
        )),
        "/bfs/index.mjs",
    )
    .await
    .unwrap();
}

#[no_mangle]
#[tokio::main]
pub async extern "system" fn Java_org_bfchain_rust_example_DenoService_denoRuntime(
    env: JNIEnv,
    _context: JObject,
    jasset_manager: JObject,
) {
    let asset_manager_ptr = unsafe {
        ndk_sys::AAssetManager_fromJava(env.get_native_interface(), jasset_manager.cast())
    };
    android_logger::init_once(
        Config::default()
            .with_min_level(Level::Debug)
            .with_tag("myrust::helloDenoRuntime"),
    );
    bootstrap_deno_runtime(
        Arc::new(AssetsModuleLoader::from_ptr(
            NonNull::new(asset_manager_ptr).unwrap(),
        )),
        "assets/hello_runtime.js",
    )
    .await
    .unwrap();
}

// #[no_mangle]
// #[allow(non_snake_case)]
// pub extern "system" fn Java_org_bfchain_rust_example_DenoService_openWebView(
//     env: JNIEnv,
//     _context: JObject,
//     callback: JObject,
// ) {
//     android_logger::init_once(
//         Config::default()
//             .with_min_level(Level::Debug)
//             .with_tag("myrust::web_socket"),
//     );
//     log::info!("i am web_socket");
//     let s = String::from("hello_runtime.html");
//     let response = env.new_string(&s).expect("Couldn't create java string!");
//     env.call_method(
//         callback,
//         "webViewCallback",
//         "(Ljava/lang/String;)V",
//         &[JValue::from(JObject::from(response))],
//     )
//     .unwrap();
//     let mut rt = tokio::runtime::Runtime::new().unwrap();
//     rt.block_on(web_socket::start());
// }
