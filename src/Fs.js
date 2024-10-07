import * as fsPromises from 'node:fs/promises';
import * as path from "node:path";
import { fileURLToPath } from 'url';
import { getOsInfo } from './OS.js';
import { invalidStatus, tableType } from './constants.js';

class Fs {
  currentPath = '';

  constructor() {
    this.currentPath = getOsInfo(['--homedir']).data;
  };

  getCurrentPath (folder = '') {
    const __filename = fileURLToPath(import.meta.url);
    console.log(__filename, path.dirname(__filename));
    // if (!folder) {
      return path.dirname(__filename);
    // }
    // return `${path.dirname(__filename)}/${folder}`;
  };

  async checkIfFile(fileName) {
    const fullPath = `${this.currentPath}/${fileName}`;
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
    // console.log(list)
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

  async cd([path]) {
    if (!path) {
      return { status: invalidStatus };
    }
    return '';
  };
};

export default new Fs();