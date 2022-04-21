export type Mode = 'development' | 'production';

export enum dataType {
  Function,
  Object,
  Array,
  Undefined,
  Null,
  Number,
  String,
  Boolean,
}

export interface UserConfig {
  crateDirectory: string;
  flags?: string;
  options?: string;
  args?: string;
  watchDirectories?: string[];
}

export type UserConfigCallback = (mode: Mode | string) => UserConfig;