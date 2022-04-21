import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitePluginWasmPack from '../dist';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vitePluginWasmPack({
    crateDirectory: './my_crate'
  })]
})
