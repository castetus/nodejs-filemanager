import * as fsPromises from 'node:fs/promises';
import fs from 'fs';
import * as path from "node:path";
import { fileURLToPath } from 'url';
import { getOsInfo } from './OS.js';
import { invalidStatus, tableType, successStatus, failedStatus } from './constants.js';

class Fs {
  currentPath = '';

  constructor() {
    this.currentPath = getOsInfo(['--homedir']).data;
  };

  getPathToFile(fileName) {
    return `${this.currentPath}/${fileName}`;
  };

  async checkIfFile(fileName) {
    const fullPath = this.getPathToFile(fileName);
    const stat = await fsPromises.lstat(fullPath);
    return stat.isFile();
  };

  async prepareFileInfo(fileName) {
    const isFile = await this.checkIfFile(fileName);
    const type = isFile ? 'file' : 'directory';
    return {
      Name: fileName,
      Type: type,
    };
  };

  async up() {
    const parentFolderPath = this.currentPath.split('/').slice(0, -1).join('/');
    this.currentPath = parentFolderPath;
    return { data: parentFolderPath };
  };

  async ls() {
    const path = this.currentPath;
    const list = await fsPromises.readdir(path);

    const promises = list.map(async (item) => await this.prepareFileInfo(item));
    const result = await Promise.allSettled(promises)
    return {
      data: result.map((el) => el.value).toSorted((a, b) => {
        if (a.Type < b.Type) return -1;
        if (a.Type > b.Type) return 1;

        return a.Name - b.Name;
      }),
      type: tableType,
    };
  };

  async cd([dirpath]) {
    if (!dirpath) {
      return { status: invalidStatus };
    }
    const realPath = path.isAbsolute(dirpath) ? dirpath : `${this.currentPath}/${dirpath}`;
    try {
      await fsPromises.access(realPath);
      this.currentPath = realPath;
      return {
        data: this.currentPath,
      };
    } catch (error) {
      return {
        status: invalidStatus,
      };
    }
  };

  async cat([pathToFile]) {
    if (!pathToFile) {
      return { status: invalidStatus };
    }

    const readStream = fs.createReadStream(pathToFile, { encoding: 'utf8' });
    readStream.on('data', (data) => {
      console.log(data)
      return {
        data,
      };
    });
  };

  async add([filename]) {
    if (!filename) {
      return { status: invalidStatus };
    }
    const newFilePath = this.getPathToFile(filename);
    try {
      await fsPromises.writeFile(newFilePath, '');
      return { status: successStatus };
    } catch (error) {
      return { status: failedStatus };
    }
  };

  async rn([pathToFile, newFileName]) {
    if (!pathToFile || !newFileName) {
      return { status: invalidStatus };
    }
    const newPath = this.getPathToFile(newFileName);
    try {
      await fsPromises.rename(pathToFile, newPath);
      return { status: successStatus };
    } catch (error) {
      return { status: failedStatus };
    }
  };

  async rm([filePath]) {
    if (!filePath) {
      return { status: invalidStatus };
    }
    try {
      await fsPromises.rm(filePath);
      return { status: successStatus };
    } catch (error) {
      return { status: failedStatus };
    }
  };
};

export default new Fs();