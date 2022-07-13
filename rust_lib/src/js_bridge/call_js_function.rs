use std::ffi::{CStr, CString};

#[no_mangle]
pub extern "C" fn js_call_function(a: &str) -> String {
    format!("Hello, {}!", a)
}

#[no_mangle]
pub extern "C" fn add_i32(a: i32, b: i32) -> i32 {
    a + b
}

#[no_mangle]
pub unsafe extern "C" fn print_buffer(ptr: *const u8, len: usize) {
    let buf = std::slice::from_raw_parts(ptr, len);
    println!("{:?}", buf);
}
