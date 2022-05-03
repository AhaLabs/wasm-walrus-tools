import { data_view, utf8_encode, UTF8_ENCODED_LEN } from './intrinsics.js';
export class Walrus {
  addToImports(imports) {
  }
  
  async instantiate(module, imports) {
    imports = imports || {};
    this.addToImports(imports);
    
    if (module instanceof WebAssembly.Instance) {
      this.instance = module;
    } else if (module instanceof WebAssembly.Module) {
      this.instance = await WebAssembly.instantiate(module, imports);
    } else if (module instanceof ArrayBuffer || module instanceof Uint8Array) {
      const { instance } = await WebAssembly.instantiate(module, imports);
      this.instance = instance;
    } else {
      const { instance } = await WebAssembly.instantiateStreaming(module, imports);
      this.instance = instance;
    }
    this._exports = this.instance.exports;
  }
  readCustomSection(arg0, arg1) {
    const memory = this._exports.memory;
    const realloc = this._exports["canonical_abi_realloc"];
    const free = this._exports["canonical_abi_free"];
    const val0 = arg0;
    const len0 = val0.length;
    const ptr0 = realloc(0, 0, 1, len0 * 1);
    (new Uint8Array(memory.buffer, ptr0, len0 * 1)).set(new Uint8Array(val0.buffer, val0.byteOffset, len0 * 1));
    const ptr1 = utf8_encode(arg1, realloc, memory);
    const len1 = UTF8_ENCODED_LEN;
    const ret = this._exports['read-custom-section'](ptr0, len0, ptr1, len1);
    let variant3;
    switch (data_view(memory).getInt32(ret + 0, true)) {
      case 0: {
        variant3 = null;
        break;
      }
      case 1: {
        const ptr2 = data_view(memory).getInt32(ret + 8, true);
        const len2 = data_view(memory).getInt32(ret + 16, true);
        const list2 = new Uint8Array(memory.buffer.slice(ptr2, ptr2 + len2 * 1));
        free(ptr2, len2, 1);
        variant3 = list2;
        break;
      }
      default:
      throw new RangeError("invalid variant discriminant for option");
    }
    return variant3;
  }
}
