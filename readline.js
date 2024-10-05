import readlinePromises from 'node:readline/promises';

export const readline = () => {

  const rl = readlinePromises.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on('line', (line) => {
    console.log(`Received: ${line}`);
  });
}