exports.nextDigit = (code) => {
  return String(
    code
      .split("")
      .reverse()
      .map((char, i) => {
        if (i % 2 === 0) {
          const multiply = parseInt(char) * 2;
          if (multiply > 9) return multiply - 9;
          else return multiply;
        } else {
          return parseInt(char);
        }
      })
      .reduce((a, b) => a + b) * 9
  ).slice(-1);
};
