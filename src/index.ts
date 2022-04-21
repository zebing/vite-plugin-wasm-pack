import { Plugin, UserConfig as ViteConfig } from 'vite';
import { Mode, UserConfig, UserConfigCallback } from './types';
import { isType, getUserConfig } from './lib';
import wasmPackPlugin from './plugin';

export default function vitePluginWasmPack(userConfig: UserConfig | UserConfigCallback | null): Plugin {
  return {
    name: 'vite-plugin-wasm-pack',
    enforce: 'pre',
    config: async (viteConfig: ViteConfig, env: { mode: string, command: string }) => {
      const config = getUserConfig(userConfig, env.mode as Mode);
      return await wasmPackPlugin(config, env.mode as Mode);
    }
  }
}