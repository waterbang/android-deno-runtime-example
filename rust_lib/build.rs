extern crate flapigen;
extern crate rifgen;

use flapigen::{JavaConfig, LanguageConfig};
use rifgen::{Generator, Language, TypeCases};
use std::path::{Path, PathBuf};
use std::{env, fs};

fn main() {
  let out_dir = env::var("OUT_DIR").unwrap();
  let in_src = "src/java_glue.rs.in";
  let out_src = Path::new(&out_dir).join("java_glue.rs");
  Generator::new(TypeCases::CamelCase, Language::Java, "src").generate_interface(in_src);
  //delete the lib folder then create it again to prevent obsolete files from staying
  let java_folder = Path::new("../app/src/main/java/org/bfchain/rust/example/lib");
  if java_folder.exists() {
    fs::remove_dir_all(java_folder).expect("remove java lib folder failed");
  }
  fs::create_dir(java_folder).unwrap();
  let swig_gen = flapigen::Generator::new(LanguageConfig::JavaConfig(
    JavaConfig::new(java_folder.into(), "org.bfchain.rust.example.lib".into())
      .use_null_annotation_from_package("androidx.annotation".into()),
  ))
  .rustfmt_bindings(true);
  swig_gen.expand("android bindings", &in_src, &out_src);
  println!("cargo:rerun-if-changed=src");

  // if env::var("TARGET").unwrap().contains("aarch64-linux-android") == false {
  //   // panic!("xxx{}",env::var("TARGET").unwrap());
  // println!("xxx{}",env::var("TARGET").unwrap());
  // }
  // deno_main();
}

use deno_core::Extension;
use deno_core::JsRuntime;
use deno_core::RuntimeOptions;

// TODO(bartlomieju): this module contains a lot of duplicated
// logic with `runtime/build.rs`, factor out to `deno_core`.
fn create_snapshot(mut js_runtime: JsRuntime, snapshot_path: &Path, files: Vec<PathBuf>) {
  // TODO(nayeemrmn): https://github.com/rust-lang/cargo/issues/3946 to get the
  // workspace root.
  let display_root = Path::new(env!("CARGO_MANIFEST_DIR")).parent().unwrap();
  for file in files {
    println!("cargo:rerun-if-changed={}", file.display());
    let display_path = file.strip_prefix(display_root).unwrap();
    let display_path_str = display_path.display().to_string();
    js_runtime
      .execute_script(
        &("deno:".to_string() + &display_path_str.replace('\\', "/")),
        &std::fs::read_to_string(&file).unwrap(),
      )
      .unwrap();
  }

  let snapshot = js_runtime.snapshot();
  let snapshot_slice: &[u8] = &*snapshot;
  println!("Snapshot size: {}", snapshot_slice.len());
  std::fs::write(&snapshot_path, snapshot_slice).unwrap();
  println!("Snapshot written to: {} ", snapshot_path.display());
}

fn create_compiler_snapshot(snapshot_path: &Path, files: Vec<PathBuf>, _cwd: &Path) {
  let js_runtime = JsRuntime::new(RuntimeOptions {
    will_snapshot: true,
    extensions: vec![Extension::builder().build()],
    ..Default::default()
  });

  create_snapshot(js_runtime, snapshot_path, files);
}

fn git_commit_hash() -> String {
  if let Ok(output) = std::process::Command::new("git")
    .arg("rev-list")
    .arg("-1")
    .arg("HEAD")
    .output()
  {
    if output.status.success() {
      std::str::from_utf8(&output.stdout[..40])
        .unwrap()
        .to_string()
    } else {
      // When not in git repository
      // (e.g. when the user install by `cargo install deno`)
      "UNKNOWN".to_string()
    }
  } else {
    // When there is no git command for some reason
    "UNKNOWN".to_string()
  }
}

fn deno_main() {
  // Skip building from docs.rs.
  if env::var_os("DOCS_RS").is_some() {
    return;
  }

  // Host snapshots won't work when cross compiling.
  let target = env::var("TARGET").unwrap();
  let host = env::var("HOST").unwrap();
  if target != host {
    panic!("Cross compiling with snapshot is not supported.");
  }
  // To debug snapshot issues uncomment:
  // op_fetch_asset::trace_serializer();

  if let Ok(c) = env::var("DENO_CANARY") {
    println!("cargo:rustc-env=DENO_CANARY={}", c);
  }
  println!("cargo:rerun-if-env-changed=DENO_CANARY");

  println!("cargo:rustc-env=GIT_COMMIT_HASH={}", git_commit_hash());
  println!("cargo:rerun-if-env-changed=GIT_COMMIT_HASH");

  println!("cargo:rustc-env=TARGET={}", env::var("TARGET").unwrap());
  println!("cargo:rustc-env=PROFILE={}", env::var("PROFILE").unwrap());

  let c = PathBuf::from(env::var_os("CARGO_MANIFEST_DIR").unwrap());
  let o = PathBuf::from(env::var_os("OUT_DIR").unwrap());

  // Main snapshot
  let compiler_snapshot_path = o.join("COMPILER_SNAPSHOT.bin");

  let js_files = get_js_files("tsc");
  create_compiler_snapshot(&compiler_snapshot_path, js_files, &c);

  #[cfg(target_os = "windows")]
  {
    let mut res = winres::WindowsResource::new();
    res.set_icon("deno.ico");
    res.set_language(winapi::um::winnt::MAKELANGID(
      winapi::um::winnt::LANG_ENGLISH,
      winapi::um::winnt::SUBLANG_ENGLISH_US,
    ));
    res.compile().unwrap();
  }
}

fn get_js_files(d: &str) -> Vec<PathBuf> {
  let manifest_dir = Path::new(env!("CARGO_MANIFEST_DIR"));
  let mut js_files = std::fs::read_dir(d)
    .unwrap()
    .map(|dir_entry| {
      let file = dir_entry.unwrap();
      manifest_dir.join(file.path())
    })
    .filter(|path| path.extension().unwrap_or_default() == "js")
    .collect::<Vec<PathBuf>>();
  js_files.sort();
  js_files
}
