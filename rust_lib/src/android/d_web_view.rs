#![cfg(target_os = "android")]

use android_logger::Config;
use log::Level;
// 引用 jni 库的一些内容，就是上面添加的 jni 依赖
use jni::{
    objects::{JObject, JString, JValue},
    JNIEnv,
};

use crate::web_socket;

/// 启动webView
#[no_mangle]
#[allow(non_snake_case)]
pub extern "system" fn Java_org_bfchain_rust_example_DenoService_openWebView(
    env: JNIEnv,
    _context: JObject,
    callback: JObject,
) {
    android_logger::init_once(
        Config::default()
            .with_min_level(Level::Debug)
            .with_tag("myrust::web_socket"),
    );
    log::info!("i am web_socket");
    let s = String::from("openDWebView");
    let response = env.new_string(&s).expect("Couldn't create java string!");
    env.call_method(
        callback,
        "webViewCallback",
        "(Ljava/lang/String;)V",
        &[JValue::from(JObject::from(response))],
    )
    .unwrap();
    let mut rt = tokio::runtime::Runtime::new().unwrap();
    rt.block_on(web_socket::start());
}
