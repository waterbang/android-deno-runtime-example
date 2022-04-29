// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.

use deno_core::Extension;

pub mod errors;

pub fn cli_exts() -> Vec<Extension> {
  vec![errors::init()]
}
