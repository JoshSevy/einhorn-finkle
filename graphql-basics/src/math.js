//TODO Define add function that takes two arguments and adds them up
//TODO Define subtract function that takes two arguments and subtracts them
//TODO Setup add as a default export
//TODO Setup subtract as a named export
//TODO Import both functions into index.js
//TODO Use both functions and print the result from each

const add = (num1, num2) => {
  return num1 + num2;
};

const subtract = (num1, num2) => {
  return num1 - num2;
};

export { add, subtract as default };