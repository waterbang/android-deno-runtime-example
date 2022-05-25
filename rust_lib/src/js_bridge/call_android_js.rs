use crate::web_socket::*;
use std::sync::Arc;

struct ServerService;

const MUL: u32 = 1;

impl ServerService {
  fn add(a: u32, b: u32) -> u32 {
    a + b
  }
  fn print(s: String) {
    println!("{}", s);
  }
  fn MUL(a: u32, b: u32) -> u32 {
    a * b
  }
}

// fn main() -> Result<(), Box<dyn std::error::Error>> {
//   std::thread::spawn(|| {
//     let mut ser = ws::bind("127.0.0.1:3333").unwrap();
//     let (adaptor, _uri) = ws::accept(&mut ser).unwrap();
//     Session::new(adaptor, Arc::new(ServerService)).loop_handle();
//   });

//   std::thread::sleep_ms(100);
//   let session = Session::new(ws::connect("ws://127.0.0.1:3333")?, Arc::new(EmptyService));
//   let val: u32 = session.request("add", (1, 2)).into()?;
//   session.notify("print", format!("the result is {}", val));
//   let val: u32 = session.request(MUL, (2, 3)).into()?;
//   assert_eq!(val, 6);

//   Ok(())
// }
