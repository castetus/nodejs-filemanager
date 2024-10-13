import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream/promises';
import { successStatus, invalidStatus } from './constants.js';

const processFile = async (...args) => {
  const [sourcePath, destinationPath, mode] = args;
  if (!sourcePath || !destinationPath) {
    return { status: invalidStatus };
  }
  const readStream = createReadStream(sourcePath);
  const processStream = mode === 'compress' ? createBrotliCompress() : createBrotliDecompress();
  const writeStream = createWriteStream(destinationPath);

  await pipeline(
    readStream,
    processStream,
    writeStream,
  );
  return { status: successStatus };
};

export const compress = async ([sourcePath, destinationPath]) => {
  return processFile(sourcePath, destinationPath, 'compress')
};

export const decompress = async ([sourcePath, destinationPath]) => {
  return processFile(sourcePath, destinationPath, 'decompress')
};