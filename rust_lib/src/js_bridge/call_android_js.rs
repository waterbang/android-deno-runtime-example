use std::collections::HashMap;

pub struct handle_function {
    pub fun_type: Vec<String>,
    pub fun_map: HashMap<String, String>,
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
}
