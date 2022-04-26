import { existsSync } from 'fs';
import { spawn, SpawnOptions } from 'child_process';
import path from 'path';
import Watchpack from 'watchpack';
import which from 'which';
import { homedir } from 'os';
import { info, error } from './lib';
import { Mode, UserConfig } from './types';

export default async function wasmPackPlugin(userConfig: UserConfig, mode: Mode) {
  const isDev = mode === 'development';
  const crateDirectory = path.resolve(process.cwd(), userConfig.crateDirectory);
  const flags = userConfig.flags || '--verbose';
  const options = userConfig.options || '--log-level info';
  const watchDirectories = [
    ...(userConfig.watchDirectories || []),
    path.resolve(crateDirectory, 'src')
  ];
  const watchFiles = [path.resolve(crateDirectory, 'Cargo.toml')];
  const watcher = new Watchpack({});

  let args = `${crateDirectory} ${(userConfig.args || '')}`;

  if (!args.startsWith('--target')) {
    args += ' --target web';
  }

  if (!args.startsWith('--dev') && isDev) {
    args += ' --dev';
  }
  
  if (!checkWasmPack()) {
    error('Wasm-pack not found. Please install wasm-pack first. see: https://rustwasm.github.io/wasm-pack/installer/')
  }

  if (!existsSync(crateDirectory)) {
    error(`crateDirectory: ${userConfig.crateDirectory}  is not a directory`);
  }

  if (isDev) {
    watcher.watch(watchFiles, watchDirectories, Date.now() - 10000);

    watcher.on('aggregated', () => {
      buildWasmPack(flags, options, args, isDev);
    })
  }

  await buildWasmPack(flags, options, args, isDev);
}

const checkWasmPack = (): boolean => {
  const binPath = findWasmPack();
  return existsSync(binPath);
}

const buildWasmPack = async (flags: string, options: string, args: string, isDev: boolean): Promise<any> => {
  const wasmPackBin = findWasmPack()
  const argList = args.split(' ').filter((x) => x);
  const preArgList = `${flags} ${options} build`.split(' ').filter((x) => x);
  const allArgs = [...preArgList, ...argList];
  const spawnOptions: SpawnOptions = {
    cwd: process.cwd(),
    stdio: 'inherit',
  }

  if (isDev) {
    const crateDirectory = argList[0];
    const userOutFolderIndex = allArgs.indexOf('--out-dir');
    const outFolder = path.resolve(process.cwd(), './node_modules/.zebing/vite-plugin-wasm-pack/pkg');
    let userOutFolder = `${crateDirectory}/pkg`;

    if (userOutFolderIndex > -1) {
      userOutFolder = path.resolve(crateDirectory, allArgs[userOutFolderIndex + 1])
      allArgs.splice(userOutFolderIndex + 1, 1, outFolder);
    } else {
      allArgs.push('--out-dir');
      allArgs.push(outFolder);
    }

    console.log(`> wasm-pack ${[...preArgList, ...argList].join(' ')}`);
    await runSpawn(wasmPackBin, allArgs, spawnOptions);
    await runSpawn('cp', ['-rf', outFolder + '/', userOutFolder], spawnOptions);

  } else {
    console.log(`> wasm-pack ${[...preArgList, ...argList].join(' ')}`);
    await runSpawn(wasmPackBin, allArgs, spawnOptions);
  }
}

const runSpawn = (bin: string, args: string[], options: SpawnOptions): Promise<void> => {
  return new Promise((resolve, reject) => {
    const process = spawn(bin, args, options)

    process.on('close', (code) => {
        if (code === 0) {
            resolve()
        } else {
            reject(new Error(`Spawn error when run ${bin}`))
        }
    })

    process.on('error', reject)
  })
}

export const findWasmPack = (): string => 
  process.env['WASM_PACK_PATH'] 
    ?? which.sync('wasm-pack', { nothrow: true }) 
    ?? path.join(homedir(), '.cargo', 'bin', 'wasm-pack');
