import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream/promises';
import { successStatus, invalidStatus } from './constants.js';

export const compress = async ([sourcePath, destinationPath]) => {
  if (!sourcePath || !destinationPath) {
    return { status: invalidStatus };
  }
  const readStream = createReadStream(sourcePath);
  const processStream = createBrotliCompress();
  const writeStream = createWriteStream(destinationPath);

  await pipeline(
    readStream,
    processStream,
    writeStream,
  );
  return { status: successStatus };
};

export const decompress = async ([sourcePath, destinationPath]) => {
  if (!sourcePath || !destinationPath) {
    return { status: invalidStatus };
  }
  const readStream = createReadStream(sourcePath);
  const processStream = createBrotliDecompress();
  const writeStream = createWriteStream(destinationPath);

  await pipeline(
    readStream,
    processStream,
    writeStream,
  );
  return { status: successStatus };
};