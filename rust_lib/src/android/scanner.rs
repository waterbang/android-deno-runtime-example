#[link(name = "ExportNative")]

extern "C" {
  fn org_bfchain_rust_example_ExportNative();
}

fn main() {
  unsafe {
    org_bfchain_rust_example_ExportNative();
  }
}

// use org_bfchain_rust_example_denoservice::aidl::org::bfchain::rust_example::IDenoService::{
//   BnDenoService, IDenoService,
// };

// use org_bfchain_rust_example_denoservice::binder::{
//   BinderFeatures, Interface, Result as BinderResult, Strong,
// };

// pub struct ScannerService;

// impl Interface for ScannerService {}

// impl IDenoService for ScannerService {
//   fn HelloAIDL(&self, name: &str) -> BinderResult<i32> {
//     Ok(42)
//   }

//   fn basicTypes(&self, _: i32, _: i64, _: bool, _: f32, _: f64, _: &str) -> BinderResult<()> {
//     // Do something interesting...
//     Ok(())
//   }
// }
