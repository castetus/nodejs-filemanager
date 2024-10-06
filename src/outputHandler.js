import { invalidInputMessage, operationFailedMessage } from "./constants.js";

export const handleInvalidCommand = () => {
  console.log(invalidInputMessage);
}

export const handleError = () => {
  throw new Error(operationFailedMessage);
}