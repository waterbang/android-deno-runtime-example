pub mod android;
mod diagnostics;
mod errors;
mod fmt_errors;
mod js_bridge;
mod module_loader;
mod my_deno_core;
mod my_deno_runtime;
mod ops;
mod web_socket;

// pub use crate::java_glue::*;
// use crate::module_loader::AssetsModuleLoader;
// use android_logger::Config;
// use log::Level;
// use rifgen::rifgen_attr::*;
// use std::rc::Rc;

// pub struct RustLog;

// impl RustLog {
//     //set up logging
//     #[generate_interface]
//     pub fn initialise_logging() {
//         #[cfg(target_os = "android")]
//         android_logger::init_once(
//             Config::default()
//                 .with_min_level(Level::Trace)
//                 .with_tag("Rust"),
//         );
//         log_panics::init();
//         // log::info!("pwe:{:?}", std::env::current_exe().unwrap());
//         // log::info!("pwd:{:?}", std::env::current_dir().unwrap());
//         // std::fs::create_dir("he").unwrap();
//         // std::fs::write("he/zzz.js", "console.log('xxx')").unwrap();
//         // log::info!("dir:{:?}", std::fs::read_dir("he"));
//         log::info!("Logging initialised from Rust");
//     }

//     #[generate_interface]
//     pub fn test_deno_core() {
//         my_deno_core::bootstrap_deno_core();
//     }
// }
