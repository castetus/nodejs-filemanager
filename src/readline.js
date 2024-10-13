import readlinePromises from 'node:readline/promises';
import { handleInput } from './inputHandler.js';

export const readline = () => {

  const rl = readlinePromises.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on('line', (line) => {
    handleInput(line);
  });
}