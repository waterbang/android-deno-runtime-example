mod java_glue;
pub use crate::java_glue::*;
mod my_deno_core;
mod my_deno_runtime;

use android_logger::Config;
use log::Level;
use rifgen::rifgen_attr::*;

pub struct RustLog;

impl RustLog {
    //set up logging
    #[generate_interface]
    pub fn initialise_logging() {
        #[cfg(target_os = "android")]
        android_logger::init_once(
            Config::default()
                .with_min_level(Level::Trace)
                .with_tag("Rust"),
        );
        log_panics::init();
        log::info!("Logging initialised from Rust");
    }

    #[generate_interface]
    pub fn test_deno_core() {
        my_deno_core::bootstrap_deno_core();
    }
    // #[generate_interface]
    // pub fn test_deno_runtime() {
    //     my_deno_runtime::bootstrap_deno_runtime();
    // }
}
