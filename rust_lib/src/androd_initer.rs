use android_logger::Config;
use log::Level;
// 引用标准库的一些内容
use std::ffi::{CStr, CString};
// 引用 jni 库的一些内容，就是上面添加的 jni 依赖
use jni::{
    objects::{JObject, JString, JValue},
    sys::jstring,
    JNIEnv, JavaVM,
};

#[no_mangle]
pub extern "system" fn Java_org_bfchain_rust_example_DenoService_initialiseLogging(
    env: JNIEnv,
    _context: JObject,
) {
    #[cfg(target_os = "android")]
    android_logger::init_once(
        Config::default()
            .with_min_level(Level::Trace)
            .with_tag("Rust"),
    );
    log_panics::init();
    // log::info!("pwe:{:?}", std::env::current_exe().unwrap());
    // log::info!("pwd:{:?}", std::env::current_dir().unwrap());
    // std::fs::create_dir("he").unwrap();
    // std::fs::write("he/zzz.js", "console.log('xxx')").unwrap();
    // log::info!("dir:{:?}", std::fs::read_dir("he"));
    log::info!("Logging initialised from Rust");

    std::env::set_var("NO_COLOR", "true");
}

use std::ptr::NonNull;

#[no_mangle]
pub extern "system" fn Java_org_bfchain_rust_example_DenoService_hello(
    env: JNIEnv,
    context: JObject,
) {
    log::info!("hello!!!hello!!!hello!!!hello!!!hello!!!");
    let global_context = env.new_global_ref(context).unwrap();
    rust_lib_ndk_context_initialize(env.get_java_vm().unwrap(), global_context.as_obj());
}

#[no_mangle]
pub extern "C" fn rust_lib_ndk_context_initialize(vm: JavaVM, context: JObject) {
    unsafe {
        ndk_context::initialize_android_context(vm.get_java_vm_pointer().cast(), context.cast())
    };
    log::info!("android context inited!!!!!");
    let aml = crate::module_loader::AssetsModuleLoader::new();
    log::info!(
        "hello_runtime.js: {}",
        aml.get_string_asset("hello_runtime.js")
    );
}

#[no_mangle]
pub extern "system" fn Java_org_bfchain_rust_example_DenoService_hello2(
    env: JNIEnv,
    _context: JObject,
    jasset_manager: JObject,
) {
    let asset_manager_ptr = unsafe {
        ndk_sys::AAssetManager_fromJava(env.get_native_interface(), jasset_manager.cast())
    };
    let aml = crate::module_loader::AssetsModuleLoader::from_ptr(
        NonNull::new(asset_manager_ptr).unwrap(),
    );
    log::info!(
        "hello_runtime.js: {}",
        aml.get_string_asset("hello_runtime.js")
    );
}

use crate::module_loader::AssetsModuleLoader;
use crate::my_deno_runtime::bootstrap_deno_runtime;
use std::sync::Arc;

#[no_mangle]
#[tokio::main]
pub async extern "system" fn Java_org_bfchain_rust_example_DenoService_helloDenoRuntime(
    env: JNIEnv,
    _context: JObject,
    jasset_manager: JObject,
) {
    let asset_manager_ptr = unsafe {
        ndk_sys::AAssetManager_fromJava(env.get_native_interface(), jasset_manager.cast())
    };
    bootstrap_deno_runtime(
        Arc::new(AssetsModuleLoader::from_ptr(
            NonNull::new(asset_manager_ptr).unwrap(),
        )),
        "assets/hello_runtime.js",
    )
    .await
    .unwrap();
}

#[no_mangle]
#[allow(non_snake_case)]
pub extern "system" fn Java_org_bfchain_rust_example_DenoService_invokeCallbackViaJNI(
    env: JNIEnv,
    _context: JObject,
    callback: JObject,
) {
    android_logger::init_once(
        Config::default()
            .with_min_level(Level::Debug)
            .with_tag("myrust"),
    );
    log::info!("i am invokeCallbackViaJNI");
    let s = String::from("Hello from Rust");
    let response = env.new_string(&s).expect("Couldn't create java string!");
    env.call_method(
        callback,
        "callback",
        "(Ljava/lang/String;)V",
        &[JValue::from(JObject::from(response))],
    )
    .unwrap();
}
