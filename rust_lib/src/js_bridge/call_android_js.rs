use std::collections::HashMap;

pub struct handle_function {
    fun_type: Vec<String>,
    fun_map: HashMap<String, String>,
}

impl handle_function {
    pub fn new() -> handle_function {
        let operation_fun = vec![String::from("openDWebView"), String::from("openScanner")];
        let mut my_map: HashMap<String, String> = HashMap::new();
        for opera in operation_fun.iter() {
            my_map.insert(opera.to_string(), opera.to_string());
        }
        handle_function {
            fun_map: my_map,
            fun_type: operation_fun,
        }
    }

    pub fn get(&self, target: &String) -> Option<&String> {
        self.fun_map.get(target)
    }
    /// 验证是否是允许操作的函数
    pub fn handle_match(fun: &str) -> Result<&str, &str> {
        match fun {
            "openDWebView" => Ok(fun),
            "openScanner" => Ok(fun),
            _ => return Err("handle function Not fund"),
        }
    }
}

pub fn save_fn<F>(func: F, fun_type: &str)
where
    F: FnOnce(&str) -> (),
{
    // `func` consumes its captured variables, so it cannot be run more
    // than once.
    func(fun_type);

    println!("Delicious!");

    // Attempting to invoke `func()` again will throw a `use of moved
    // value` error for `func`.
}
