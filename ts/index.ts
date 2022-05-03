
import { WALRUS_BYTES } from "./wasm";

import { Walrus } from "./walrus";

let walrus = new Walrus();
const UTF8_DECODER = new TextDecoder('utf-8');

export async function readCustomSection(bytes: Uint8Array, name: string): Promise<string | null> {
  if (!walrus.instance) {
    const wasm_bytes = Buffer.from(WALRUS_BYTES, 'base64');
    await walrus.instantiate(wasm_bytes);
  }


  const res = walrus.readCustomSection(bytes, name);
  if (res) {
    return UTF8_DECODER.decode(res);
  }
  return res;

}