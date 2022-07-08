use std::ffi::{CStr, CString};

#[no_mangle]
pub extern "C" fn js_call_function(a: &str) -> String {
    format!("Hello, {}!", a)
}

#[no_mangle]
pub extern "C" fn add(a: isize, b: isize) -> isize {
    a + b
}

#[no_mangle]
pub extern "C" fn send_data_to_deno(callBack: CString) {}
