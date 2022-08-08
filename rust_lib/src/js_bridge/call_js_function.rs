// #![cfg(target_os = "android")]
use crate::android::android_inter;
use crate::js_bridge::call_android_function;
use deno_core::{op, Extension, JsRuntime, RuntimeOptions, Snapshot};
use android_logger::Config;
use deno_core::v8::{self, Set};
use log::{debug, error, info, Level};

use std::result::Result::Ok;
use std::str;

// #[no_mangle]
// pub unsafe extern "C" fn js_to_rust_buffer(ptr: *const u8, len: usize) {
//     let buf = std::slice::from_raw_parts(ptr, len).to_vec();
//     call_android_function::call_android(buf); // 通知FFI函数
// }

// #[no_mangle]
// pub unsafe extern "C" fn eval_js(ptr: *const u8, len: usize) {
//     let buf = std::slice::from_raw_parts(ptr, len).to_vec();
//     call_android_function::call_android_evaljs(buf); // 通知FFI函数
// }

// #[no_mangle]
// pub unsafe extern "C" fn rust_to_js_buffer(ptr: *const u8, len: usize) -> *const u8 {
//     let buf = std::slice::from_raw_parts(ptr, len).to_vec();
//     android_logger::init_once(
//         Config::default()
//             .with_min_level(Level::Debug)
//             .with_tag("deno_runtime::rust_to_js_buffer"),
//     );
//     log::info!("i am rust_to_js_buffer {:?}", buf);
//     ptr
// }

// static mut STORED_FUNCTION: Option<extern "C" fn(u8) -> u8> = None;

// #[no_mangle]
// pub extern "C" fn store_function(func: Option<extern "C" fn(u8) -> u8>) {
//     unsafe { STORED_FUNCTION = func };
//     if func.is_none() {
//         println!("STORED_FUNCTION_2 cleared");
//     }
// }
// #[no_mangle]
// pub extern "C" fn store_function2(
//     f: &dyn Fn(Box<[u8]>) -> Box<[u8]>,
// ) -> &dyn std::ops::Fn(Box<[u8]>) -> Box<[u8]> {
//     f
// }
