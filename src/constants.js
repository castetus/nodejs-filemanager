import { getOsInfo } from "./OS.js";
import fs from './Fs.js';

export const okStatus = 'ok';
export const invalidStatus = 'error';

export const tableType = 'table';

export const invalidInputMessage = 'Invalid input';

export const operationFailedMessage = 'Operation failed';

export const commands = {
  '.exit': process.exit,
  'os': getOsInfo,
  'ls': fs.ls.bind(fs),
  'up': fs.up.bind(fs),
  'cd': fs.cd.bind(fs),
};