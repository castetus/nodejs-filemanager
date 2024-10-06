import * as fsPromises from 'node:fs/promises';

class Fs {
  currentPath = '';

  async 


  async ls(path) {
    const result = await fsPromises.readdir(path);
    return result;
  }
};

export default new Fs();