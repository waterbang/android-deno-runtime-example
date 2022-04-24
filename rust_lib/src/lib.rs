// mod java_glue;
//
// #[cfg(test)]
// mod tests {
//     #[test]
//     fn it_works() {
//         let result = 2 + 2;
//         assert_eq!(result, 4);
//     }
// }

mod java_glue;
pub use crate::java_glue::*;

use deno_core::op;
use deno_core::Extension;
use deno_core::JsRuntime;
use deno_core::RuntimeOptions;
use deno_core::*;

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
    pub fn test_v8() {
        // Build a deno_core::Extension providing custom ops
        let ext = Extension::builder()
            .ops(vec![
                // An op for summing an array of numbers
                // The op-layer automatically deserializes inputs
                // and serializes the returned Result & value
                op_sum::decl(),
            ])
            .build();

        // Initialize a runtime instance
        let mut runtime = JsRuntime::new(RuntimeOptions {
            extensions: vec![ext],
            ..Default::default()
        });

        // Now we see how to invoke the op we just defined. The runtime automatically
        // contains a Deno.core object with several functions for interacting with it.
        // You can find its definition in core.js.
        runtime
            .execute_script(
                "<usage>",
                r#"
                    // Print helper function, calling Deno.core.print()
                    function print(value) {
                        Deno.core.print(value.toString()+"\n");
                    }
                    const arr = [1, 2, 3];
                    print("The sum of");
                    print(arr);
                    print("is");
                    print(Deno.core.opSync('op_sum', arr));
                    // And incorrect usage
                    try {
                        print(Deno.core.opSync('op_sum', 0));
                    } catch(e) {
                        print('Exception:');
                        print(e);
                    }
                "#,
            )
            .unwrap();
    }
}

#[op]
fn op_sum(nums: Vec<f64>) -> Result<f64, deno_core::error::AnyError> {
    // Sum inputs
    let sum = nums.iter().fold(0.0, |a, v| a + v);
    // return as a Result<f64, AnyError>
    Ok(sum)
}
