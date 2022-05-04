# Wasm tool in wasm

Currently this uses the walrus rust crate to parse a custom section of a wasm binary.

# Use it

not published on NPM yet, so install as GH dep.

With npm:

    npm i -S wasm-walrus-tools@AhaLabs/wasm-walrus-tools#1.0.0

With yarn:

    yarn add wasm-walrus-tools@AhaLabs/wasm-walrus-tools#1.0.0

Then use it in your app:

```ts
import { readCustomSection } from 'wasm-walrus-tools'

// Now, given a `wasm` variable that contains a Wasm binary with a custom
// section called 'json':
console.log(readCustomSection(wasm, 'json'))
```