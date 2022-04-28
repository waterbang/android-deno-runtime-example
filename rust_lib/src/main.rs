mod my_deno_core;
mod my_deno_runtime;
use deno_core::FsModuleLoader;
use std::path::Path;
use std::rc::Rc;

use log::{Level, Metadata, Record};

struct SimpleLogger;

impl log::Log for SimpleLogger {
    fn enabled(&self, metadata: &Metadata) -> bool {
        metadata.level() <= Level::Info
    }

    fn log(&self, record: &Record) {
        if self.enabled(record.metadata()) {
            println!("{} - {}", record.level(), record.args());
        }
    }

    fn flush(&self) {}
}

static LOGGER: SimpleLogger = SimpleLogger;

#[tokio::main]
async fn main() {
    log::set_logger(&LOGGER).map(|()| log::set_max_level(log::LevelFilter::Info)).unwrap();

    // test 1
    my_deno_core::bootstrap_deno_core();

    // test 2
    let js_path = Path::new(env!("CARGO_MANIFEST_DIR")).join("assets/hello_runtime.js");
    my_deno_runtime::bootstrap_deno_runtime(Rc::new(FsModuleLoader), &js_path.to_string_lossy())
        .await
        .unwrap();
}
