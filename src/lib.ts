import chalk from 'chalk';
import { dataType, UserConfig, UserConfigCallback, Mode } from './types';

export const error = (msg: string) => console.error(chalk.bold.red(msg));
export const info = (msg: string) => console.log(chalk.bold.blue(msg));
export const isType = (value: any, type: dataType) => Object.prototype.toString.call(value) === `[object ${type}]`;
export const getUserConfig = (userConfig: UserConfig | UserConfigCallback | null, mode: Mode): UserConfig => {
  if (userConfig instanceof Function) {
    return userConfig(mode);
  }

  return userConfig || {
    crateDirectory: './'
  };
}
