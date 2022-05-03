"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UTF8_ENCODED_LEN = exports.utf8_encode = exports.data_view = void 0;
let DATA_VIEW = new DataView(new ArrayBuffer());
function data_view(mem) {
    if (DATA_VIEW.buffer !== mem.buffer)
        DATA_VIEW = new DataView(mem.buffer);
    return DATA_VIEW;
}
exports.data_view = data_view;
const UTF8_ENCODER = new TextEncoder('utf-8');
function utf8_encode(s, realloc, memory) {
    if (typeof s !== 'string')
        throw new TypeError('expected a string');
    if (s.length === 0) {
        exports.UTF8_ENCODED_LEN = 0;
        return 1;
    }
    let alloc_len = 0;
    let ptr = 0;
    let writtenTotal = 0;
    while (s.length > 0) {
        ptr = realloc(ptr, alloc_len, 1, alloc_len + s.length);
        alloc_len += s.length;
        const { read, written } = UTF8_ENCODER.encodeInto(s, new Uint8Array(memory.buffer, ptr + writtenTotal, alloc_len - writtenTotal));
        writtenTotal += written;
        s = s.slice(read);
    }
    if (alloc_len > writtenTotal)
        ptr = realloc(ptr, alloc_len, 1, writtenTotal);
    exports.UTF8_ENCODED_LEN = writtenTotal;
    return ptr;
}
exports.utf8_encode = utf8_encode;
exports.UTF8_ENCODED_LEN = 0;
//# sourceMappingURL=intrinsics.js.map