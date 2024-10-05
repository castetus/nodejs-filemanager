class User {

  username = 'unknown_user';
  greetingString = 'Welcome to the File Manager, ';

  setUsername(name) {
    this.username = name;
  }

  getUsername() {
    return this.username;
  }

  greet() {
    console.log(`${this.greetingString}${this.username}!`);
  }
}

export default new User();