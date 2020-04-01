const KeyType = Object.freeze({
  numeric: 'numeric',
  dot: 'dot',
  operator: 'operator',
  clear: 'clear',
  result: 'result',
});

const DisplayState = Object.freeze({
  numeric: 'numeric',
  decimal: 'decimal',
  dot: 'dot',
  operator: 'operator',
});

const CalcState = Object.freeze({
  resulted: 'resulted',
  cleared: 'cleared',
  input: 'input',
});

export { KeyType, CalcState, DisplayState };
