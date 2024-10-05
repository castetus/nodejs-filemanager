import os from 'node:os';

class OS {
  getHomeDir() {
    return os.homedir();
  }
}