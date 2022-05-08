
import { WALRUS_BYTES } from "./wasm";
import { Walrus } from "./walrus";

let walrus = new Walrus();

export async function readCustomSection(bytes: Uint8Array, name: string): Promise<Uint8Array | null> {
    if (!walrus.instance) {
        const wasm_bytes = Buffer.from(WALRUS_BYTES, 'base64');
        await walrus.instantiate(wasm_bytes);
    }
    return walrus.readCustomSection(bytes, name);
}