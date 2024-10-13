import os from 'node:os';

export const getOsInfo = (args) => {
  const arg = args[0].slice(2);

  switch (arg) {
    case 'EOL':
      return { data: os.EOL === '\n' ? '\\n' : '\\r\\n' };
    case 'cpus':
      return { data: os.cpus() };
    case 'homedir':
      return { data: os.homedir() };
    case 'username':
      return { data: os.userInfo().username };
    case 'architecture':
      return { data: process.arch };
  }
};