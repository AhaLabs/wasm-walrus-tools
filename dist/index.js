"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readCustomSection = void 0;
const wasm_1 = require("./wasm");
const walrus_1 = require("./walrus");
let walrus = new walrus_1.Walrus();
function readCustomSection(bytes, name) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!walrus.instance) {
            const wasm_bytes = Buffer.from(wasm_1.WALRUS_BYTES, 'base64');
            yield walrus.instantiate(wasm_bytes);
        }
        return walrus.readCustomSection(bytes, name);
    });
}
exports.readCustomSection = readCustomSection;
//# sourceMappingURL=index.js.map