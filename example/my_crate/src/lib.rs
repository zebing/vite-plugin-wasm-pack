use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern {
    fn alert(s: &str);
}
extern crate web_sys;
use web_sys::console;
use js_sys::Array;


#[wasm_bindgen]
pub fn greet() -> Result<(), JsValue> {
  // 插入一个div元素
  let window: web_sys::Window = web_sys::window().unwrap();
  let document = window.document().expect("should have a document on window");
  let body = document.body().expect("document should have a body");
  let val = document.create_element("div")?;
  // val.set_attribute("src", &image_src)?;
  val.set_attribute("style", "height: 200px; width: 200px; background: green;")?;
  body.append_child(&val)?;

  // 输出 body dom
  let arr = Array::new();
  arr.push(&document);
  arr.push(&body);
  console::info(&arr);
  Ok(())
}
