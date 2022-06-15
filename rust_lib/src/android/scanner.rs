#![cfg(target_os = "android")]
use android_logger::Config;
use futures::FutureExt;
use warp::ws::Message;
// 引用 jni 库的一些内容，就是上面添加的 jni 依赖
use crate::web_socket::{self, handler::Event};
use jni::{
    objects::{JObject, JString, JValue},
    JNIEnv,
};
use log::Level;

/// 二维码扫描
#[no_mangle]
#[allow(non_snake_case)]
pub extern "system" fn Java_org_bfchain_rust_example_DenoService_mlkitBarcodeScanning(
    env: JNIEnv,
    _context: JObject,
    callback: JObject,
) {
    android_logger::init_once(
        Config::default()
            .with_min_level(Level::Debug)
            .with_tag("myrust::mlkitBarcodeScanning"),
    );
    log::info!("i am mlkitBarcodeScanning");
    let s = String::from("openScanner");
    let response = env.new_string(&s).expect("Couldn't create java string!");
    env.call_method(
        callback,
        "scannerCallback",
        "(Ljava/lang/String;)V",
        &[JValue::from(JObject::from(response))],
    )
    .unwrap();
}

/// 接收二维码扫描
#[no_mangle]
#[tokio::main]
pub async extern "system" fn Java_org_bfchain_rust_example_DenoService_getScanningData(
    env: JNIEnv,
    _context: JObject,
    scannerData: JString,
    public_key: JString,
) {
    let scannerData = String::from(env.get_string(scannerData).unwrap());
    let public_key = String::from(env.get_string(public_key).unwrap());
    log::info!(" getScanningData ->public_key:{:?}", &public_key);
    let body = web_socket::handler::Event {
        function: String::from("openScanner"),
        public_key: Some(public_key),
        message: scannerData,
    };
    web_socket::handler::publish_handler(body, web_socket::CLIENTS.clone()).await;
}
