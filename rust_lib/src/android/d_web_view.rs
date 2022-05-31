pub fn hello() {
    println!("hello");
}

// #![cfg(target_os = "android")]

// pub mod d_web_view {

//     use android_logger::Config;
//     use log::Level;
//     // 引用 jni 库的一些内容，就是上面添加的 jni 依赖
//     use jni::{
//         objects::{JObject, JString, JValue},
//         JNIEnv,
//     };

//     /// 启动webView
//     #[no_mangle]
//     #[allow(non_snake_case)]
//     pub extern "system" fn Java_org_bfchain_rust_example_DenoService_openWebView(
//         env: JNIEnv,
//         _context: JObject,
//         callback: JObject,
//     ) {
//         android_logger::init_once(
//             Config::default()
//                 .with_min_level(Level::Debug)
//                 .with_tag("myrust::openWebView"),
//         );
//         log::info!("i am mlkitBarcodeScanning");
//         let s = String::from("openWebView");
//         let response = env.new_string(&s).expect("Couldn't create java string!");
//         env.call_method(
//             callback,
//             "webViewCallback",
//             "(Ljava/lang/String;)V",
//             &[JValue::from(JObject::from(response))],
//         )
//         .unwrap();
//     }
// }
