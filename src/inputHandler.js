import { commands, tableType, invalidStatus, successStatus, failedStatus } from './constants.js';
import { handleInvalidCommand, handleError } from './outputHandler.js';

export const handleInput = async (input) => {
  const inputArr = input.split(' ');
  const command = inputArr[0];
  const args = inputArr.slice(1);

  if (commands[command] === undefined) {
    handleInvalidCommand();
    return;
  }

  const result = await commands[command](args);

  if (result.status === invalidStatus) {
    handleInvalidCommand();
    return;
  }

  if (result.status === failedStatus) {
    handleError();
    return;
  }

  if (result.status === successStatus) {
    return;
  }

  if(result.type === tableType) {
    console.table(result.data);
    return;
  }

  console.log(result.data);
};