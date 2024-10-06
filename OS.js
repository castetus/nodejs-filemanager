import os from 'node:os';

export const getOsInfo = (args) => {
  const arg = args[0].slice(2);

  switch (arg) {
    case 'EOL':
      return os.EOL === '\n' ? '\\n' : '\\r\\n';
    case 'cpus':
      return os.cpus();
    case 'homedir':
      return os.homedir();
    case 'username':
      return os.userInfo().username;
    case 'architecture':
      return process.arch;
  }
};