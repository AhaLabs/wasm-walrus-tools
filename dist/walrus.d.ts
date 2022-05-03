export class Walrus {
    addToImports(imports: any): void;
    instantiate(module: any, imports: any): Promise<void>;
    instance: WebAssembly.Instance | undefined;
    _exports: WebAssembly.Exports | undefined;
    readCustomSection(arg0: any, arg1: any): Uint8Array | null;
}
//# sourceMappingURL=walrus.d.ts.map