import { commands } from './constants.js';
import { handleInvalidCommand, handleError } from './outputHandler.js';

export const handleInput = (input) => {
  const inputArr = input.split(' ');
  const command = inputArr[0];
  const args = inputArr.slice(1);

  if (commands[command] === undefined) {
    handleInvalidCommand();
    return;
  }

  const result = commands[command](args);
  console.log(result);

  // if (!result) {
  //   handleError();
  //   return;
  // }


};