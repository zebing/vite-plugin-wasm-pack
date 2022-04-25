# @zebing/vite-plugin-wasm-pack
English | [中文](README_ZH.md)

Vite plugin for wasm-pack, make rust projects and web projects coexist.

## Installation
npm:
```
npm install --save-dev @zebing/vite-plugin-wasm-pack
```
yarn:
```
yarn add --dev @zebing/vite-plugin-wasm-pack
```

## Usage
### vite wasm-pack Project Structure
```javascript
├── README.md
├── dist
├── index.html
├── my_crate     // wasm-pack project
│   ├── Cargo.lock
│   ├── Cargo.toml
│   └── src
│       └── lib.rs
├── node_modules
├── package-lock.json
├── package.json
├── public
│   └── favicon.ico
├── src
│   ├── App.vue
│   ├── assets
│   │   └── logo.png
│   ├── components
│   │   └── HelloWorld.vue
│   └── main.js
└── vite.config.js
```

Add the plugin to your `vite.config.js` file
```javascript
import { defineConfig } from 'vite'
import vitePluginWasmPack from '@zebing/vite-plugin-wasm-pack';

export default defineConfig({
  plugins: [
    vitePluginWasmPack({
      crateDirectory: './my_crate'
    })
  ]
})
```
import crate in your code
```javascript
// main.js
import init, { greet } from '../my_crate/pkg';

init().then(() => {
  greet()
})
```

### Options

|Name|Type|Description|Default|
|---|---|---|---|
|`crateDirectory`|`string`| crate path, Cannot be empty | none
|`flags`|`string`| wasm-pack FLAGS param |`--verbose`|
|`options`|`string`| wasm-pack OPTIONS param | `--log-level info` |
|`args`|`string`| wasm-pack args param | `--target web` |
|`watchDirectories`|`string[]`| wasm-pack project hot rebuild | `src`, `Cargo.toml` |
