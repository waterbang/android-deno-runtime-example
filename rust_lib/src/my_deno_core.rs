// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.
//!  This example shows you how to define ops in Rust and then call them from
//!  JavaScript.

use std::path::Path;

use deno_core::{op, Extension, JsRuntime, RuntimeOptions, Snapshot};

// This is a hack to make the `#[op]` macro work with
// deno_core examples.
// You can remove this:
use deno_core::*;

// use log::debug;
// use once_cell::sync::Lazy;

// static COMPILER_SNAPSHOT: &[u8] = include_bytes!(concat!(
//   env!("CARGO_MANIFEST_DIR"),
//   "/assets/COMPILER_SNAPSHOT.bin"
// ));

// pub fn deno_isolate_init() -> Snapshot {
//   debug!("Deno isolate init with snapshots.");
//   Snapshot::Static(&*COMPILER_SNAPSHOT)
// }

#[op]
fn op_sum(nums: Vec<f64>) -> Result<f64, deno_core::error::AnyError> {
    // Sum inputs
    let sum = nums.iter().fold(0.0, |a, v| a + v);
    // return as a Result<f64, AnyError>
    Ok(sum)
}
#[allow(dead_code)]
pub fn bootstrap_deno_core() {
    // // Build a deno_core::Extension providing custom ops
    let ext = Extension::builder()
        .ops(vec![
            // An op for summing an array of numbers
            // The op-layer automatically deserializes inputs
            // and serializes the returned Result & value
            op_sum::decl(),
        ])
        .build();

    log::info!("JsRuntime::new");

    struct Permissions;
    impl deno_web::TimersPermission for Permissions {
        fn allow_hrtime(&mut self) -> bool {
            unreachable!("snapshotting!")
        }

        fn check_unstable(&self, _state: &deno_core::OpState, _api_name: &'static str) {
            unreachable!("snapshotting!")
        }
    }
    impl deno_ffi::FfiPermissions for Permissions {
        fn check(&mut self, _path: Option<&Path>) -> Result<(), deno_core::error::AnyError> {
            unreachable!("snapshotting!")
        }
    }

    // Initialize a runtime instance
    let mut runtime = JsRuntime::new(RuntimeOptions {
        extensions: vec![
            // deno_ffi::init::<Permissions>(false),
            deno_webidl::init(),
            deno_url::init(),
            deno_tls::init(),
            deno_web::init::<Permissions>(deno_web::BlobStore::default(), Default::default()),
            deno_console::init(),
            deno_crypto::init(None),
            // custom extension
            ext,
        ],
        // startup_snapshot: Some(deno_isolate_init()),
        ..Default::default()
    });

    // Now we see how to invoke the op we just defined. The runtime automatically
    // contains a Deno.core object with several functions for interacting with it.
    // You can find its definition in core.js.
    runtime
        .execute_script(
            "<usage>",
            // r#"
            // Deno.core.print("okokokokoko!")
            // "#,
            r#"
      // Print helper function, calling Deno.core.print()
      function print(...args) {
        Deno.core.print(args.join(" ") + "\n");
      }
      const arr = [1, 2, 3, 4];
      print("The sum of", arr, "is", Deno.core.opSync('op_sum', arr));
      // And incorrect usage
      try {
        print(Deno.core.opSync('op_sum', 0));
      } catch(e) {
        const { Console, inspectArgs } = this.__bootstrap.console;
        const console = new Console((msg, level) => Deno.core.print(msg, level > 1));

        print(console.log.toString());
        print('op_sum 0 gxot Exception:');
        console.error(e);
      }
      "#,
        )
        .unwrap();

    // let snapshot: &[u8] = runtime.snapshot();
}
