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

  async up() {
    const parentFolderPath = this.currentPath.split('/').slice(0, -1).join('/');
    this.currentPath = parentFolderPath;
    return { data: parentFolderPath };
  };

  async ls() {
    const path = this.currentPath;
    const list = await fsPromises.readdir(path);

    return {
      data: list,
      type: tableType,
    };
  };

  async cd(path) {
    console.log('fs', 'test')
    if (!path) {
      return { status: invalidStatus };
    }

  };
};

export default new Fs();