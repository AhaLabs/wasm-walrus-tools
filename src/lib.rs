wit_bindgen_rust::export!("walrus.wit");

struct Walrus {}

impl walrus::Walrus for Walrus {
    fn read_custom_section(bytes: Vec<u8>, name: String) -> Option<Vec<u8>> {
        read_custom_section(&bytes, name)
    }
}

/// Inject data into a custom section
// #[no_mangle]
#[witgen::witgen]
fn read_custom_section(bytes: &[u8], section_name: String) -> Option<Vec<u8>> {
    use wasmparser::{Parser, Payload};
    for payload in Parser::new(0).parse_all(bytes) {
        match payload.unwrap() {
            Payload::CustomSection { name, data, .. } if name == section_name => {
                return Some(data.to_vec());
            }
            _ => (),
        }
    }

    None
}
