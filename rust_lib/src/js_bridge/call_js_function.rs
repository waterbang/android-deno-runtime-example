#![cfg(target_os = "android")]
use crate::android::android_inter;
use crate::js_bridge::call_android_function;
use std::ffi::{CStr, CString};
use std::result::Result::Ok;
use std::str;

#[no_mangle]
pub extern "C" fn js_call_function(a: &str) -> String {
    format!("Hello, {}!", a)
}

#[no_mangle]
pub extern "C" fn add_i32(a: i32, b: i32) -> i32 {
    a + b
}

#[no_mangle]
pub unsafe extern "C" fn send_buffer(ptr: *const u8, len: usize) {
    let buf = std::slice::from_raw_parts(ptr, len).to_vec();
    call_android_function::call_android(buf); // 通知FFI函数
}
