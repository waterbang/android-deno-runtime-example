extern crate flapigen;
extern crate rifgen;

use std::{env, fs};
use std::path::Path;
use flapigen::{JavaConfig, LanguageConfig};
use rifgen::{Generator, Language, TypeCases};

fn main() {
    let out_dir = env::var("OUT_DIR").unwrap();
    let in_src = "src/java_glue.rs.in";
    let out_src = Path::new(&out_dir).join("java_glue.rs");
    Generator::new(TypeCases::CamelCase, Language::Java, "src")
        .generate_interface(in_src);
    //delete the lib folder then create it again to prevent obsolete files from staying
    let java_folder = Path::new("../app/src/main/java/org/bfchain/rust/example/lib");
    if java_folder.exists() {
        fs::remove_dir_all(java_folder).expect("remove java lib folder failed");
    }
    fs::create_dir(java_folder).unwrap();
    let swig_gen = flapigen::Generator::new(LanguageConfig::JavaConfig(
        JavaConfig::new(java_folder.into(), "org.bfchain.rust.example.lib".into())
            .use_null_annotation_from_package("androidx.annotation".into()),
    )).rustfmt_bindings(true);
    swig_gen.expand("android bindings", &in_src, &out_src);
    println!("cargo:rerun-if-changed=src");
}