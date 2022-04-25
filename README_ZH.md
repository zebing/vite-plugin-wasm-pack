# @zebing/vite-plugin-wasm-pack
[English](README.md) | 中文

Vite wasm-pack 插件, 让rust项目和web项目共存。

## 安装
npm:
```
npm install --save-dev @zebing/vite-plugin-wasm-pack
```
yarn:
```
yarn add --dev @zebing/vite-plugin-wasm-pack
```

## 使用
### vite wasm-pack 项目结构
```javascript
├── README.md
├── dist
├── index.html
├── my_crate // wasm-pack 工程
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

把插件加到你的 `vite.config.js` 文件
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
在你的项目中引入包
```javascript
// main.js
import init, { greet } from '../my_crate/pkg';

init().then(() => {
  greet()
})
```

### 参数

|名称|类型|描述|默认值|
|---|---|---|---|
|`crateDirectory`|`string`| wasm-pack项目路径，不能为空 | none
|`flags`|`string`| wasm-pack FLAGS 参数 |`--verbose`|
|`options`|`string`| wasm-pack OPTIONS 参数 | `--log-level info` |
|`args`|`string`| wasm-pack args 参数 | `--target web` |
|`watchDirectories`|`string[]`| wasm-pack 热更新 | `src`, `Cargo.toml` |
