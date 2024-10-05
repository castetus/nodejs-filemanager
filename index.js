import user from "./User.js";

const args = process.argv.slice(2);

args.forEach((el) => {
  if (el.startsWith('--username')) {
    user.setUsername(el.split('=')[1]);
  }
});

user.greet();

process.on('exit', (code) => {
  if (code === 0) {
    user.sayGoodbye();
  }
});