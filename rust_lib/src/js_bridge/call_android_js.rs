// use crate::easy_service;
// use crate::web_socket::*;
// use std::sync::Arc;

// struct ServerService;
// const MUL: u32 = 1;

// easy_service! {
//     ServerService(self, _ss, arg, response)

//     StringMethod {
//         "add" => (a: u32, b: u32) {
//             a + b
//         }
//         "print" => (s: String) {
//             println!("{}", s);
//         }
//     }
//     IntegerMethod {
//         MUL => (a: u32, b: u32) {
//             a * b
//         }
//     }
// }

// fn main() -> Result<(), Box<dyn std::error::Error>> {
//     std::thread::spawn(|| {
//         let mut ser = ws::bind("127.0.0.1:3333").unwrap();
//         let (adaptor, _uri) = ws::accept(&mut ser).unwrap();
//         Session::new(adaptor, Arc::new(ServerService)).loop_handle();
//     });

//     std::thread::sleep_ms(100);
//     let session = Session::new(ws::connect("ws://127.0.0.1:3333")?, Arc::new(EmptyService));
//     let val: u32 = session.request("add", (1, 2)).into()?;
//     session.notify("print", format!("the result is {}", val));
//     let val: u32 = session.request(MUL, (2, 3)).into()?;
//     assert_eq!(val, 6);

//     Ok(())
// }
