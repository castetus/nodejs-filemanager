import { createReadStream, createWriteStream } from 'fs';
import { createGzip, createUnzip } from 'zlib';
import { pipeline } from 'stream/promises';
import { successStatus, invalidStatus } from './constants.js';

export const zipUnzip = async ([sourcePath, destinationPath]) => {
  if (!filePath || !destinationPath) {
    return { status: invalidStatus };
  }
  const readStream = createReadStream(sourcePath);
  const processStream = createGzip();
  const writeStream = createWriteStream(destinationPath);

  await pipeline(
    readStream,
    processStream,
    writeStream,
  );
  return { status: successStatus };
};

export const decompress = async ([sourcePath, destinationPath]) => {
  if (!filePath || !destinationPath) {
    return { status: invalidStatus };
  }
  const readStream = createReadStream(sourcePath);
  const processStream = createUnzip();
  const writeStream = createWriteStream(destinationPath);

  await pipeline(
    readStream,
    processStream,
    writeStream,
  );
  return { status: successStatus };
};