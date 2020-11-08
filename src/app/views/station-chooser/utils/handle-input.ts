export default (input: string, value: string) => {
  if (value === '[backspace]') {
    return input.slice(0, -1);
  }

  if (value === '[space]') {
    return `${input} `;
  }

  return `${input}${value}`;
};
