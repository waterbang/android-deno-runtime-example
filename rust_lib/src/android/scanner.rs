#![cfg(target_os = "android")]

use android_logger::Config;
use log::Level;
// 引用 jni 库的一些内容，就是上面添加的 jni 依赖
use jni::objects::{JObject, JValue};

pub mod scanner {
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
        .with_tag("myrust"),
    );
    log::info!("i am mlkitBarcodeScanning");
    let s = String::from("Hello from Rust");
    let response = env.new_string(&s).expect("Couldn't create java string!");
    env
      .call_method(
        callback,
        "scannerCallback",
        "(Ljava/lang/String;)V",
        &[JValue::from(JObject::from(response))],
      )
      .unwrap();
  }
}
