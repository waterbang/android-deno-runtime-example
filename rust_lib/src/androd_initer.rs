use jni::{objects::JObject, JNIEnv, JavaVM};
use std::ptr::NonNull;

#[no_mangle]
pub extern "system" fn Java_org_bfchain_rust_example_MainActivity_hello(
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
pub extern "system" fn Java_org_bfchain_rust_example_MainActivity_hello2(
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
use std::rc::Rc;

#[no_mangle]
#[tokio::main]
pub async extern "system" fn Java_org_bfchain_rust_example_MainActivity_helloDenoRuntime(
    env: JNIEnv,
    _context: JObject,
    jasset_manager: JObject,
) {
    let asset_manager_ptr = unsafe {
        ndk_sys::AAssetManager_fromJava(env.get_native_interface(), jasset_manager.cast())
    };
    bootstrap_deno_runtime(
        Rc::new(AssetsModuleLoader::from_ptr(
            NonNull::new(asset_manager_ptr).unwrap(),
        )),
        "assets/hello_runtime.js",
    )
    .await
    .unwrap();
}
