import { pipeline } from 'node:stream/promises';
import { createReadStream } from 'node:fs';
import { createHash } from 'node:crypto';
import { successStatus, invalidStatus } from './constants.js';

export const hash = async ([filePath]) => {
  if (!filePath) {
    return { status: invalidStatus };
  }
  const readStream = createReadStream(filePath);

  const hash = createHash('sha256');

  await pipeline(
    readStream,
    hash,
  );
  process.stdout.write(`${hash.digest('hex')}\n`);
  return { status: successStatus };
};