import { getOsInfo } from "./OS.js";

export const invalidInputMessage = 'Invalid input';

export const operationFailedMessage = 'Operation failed';

export const commands = {
  '.exit': process.exit,
  'os': getOsInfo,
}