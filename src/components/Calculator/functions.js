import { CalcState, KeyType, DisplayState } from './common/enums';

function calculateState(state, keyValue, keyType) {
  function calculateDisplayState(currentDisplayState, keyType) {
    const nextCombinations = {
      [DisplayState.numeric + KeyType.numeric]: DisplayState.numeric,
      [DisplayState.numeric + KeyType.operator]: DisplayState.operator,
      [DisplayState.numeric + KeyType.dot]: DisplayState.dot,

      [DisplayState.dot + KeyType.numeric]: DisplayState.decimal,

      [DisplayState.decimal + KeyType.numeric]: DisplayState.decimal,
      [DisplayState.decimal + KeyType.operator]: DisplayState.operator,

      [DisplayState.operator + KeyType.numeric]: DisplayState.numeric,
    };

    const combination = currentDisplayState + keyType;

    return nextCombinations[combination];
  }

  function initialState(state, keyValue) {
    return {
      ...state,
      result: {
        display: keyValue,
        keyTypes: [KeyType.numeric],
        displayStates: [DisplayState.numeric],
      },
      calcState: CalcState.input,
      displayState: DisplayState.numeric,
    };
  }

  function concat(state, keyValue, keyType) {
    const display = (state.result.display += keyValue);
    const keyTypes = [...state.result.keyTypes, keyType];
    const displayState = calculateDisplayState(state.displayState, keyType);
    const displayStates = [...state.result.displayStates, displayState];
    return {
      ...state,
      displayState,
      result: { display, keyTypes, displayStates },
      calcState: CalcState.input,
    };
  }

  function clearLast(state) {
    let display;
    let keyTypes;
    let displayStates;
    let calcState;
    let displayState;

    if (state.result.display.length > 1) {
      display = state.result.display.slice(0, -1);
      keyTypes = state.result.keyTypes.slice(0, -1);
      calcState = state.calcState;
      displayStates = state.result.displayStates.slice(0, -1);
      displayState = displayStates[displayStates.length - 1];
    } else {
      display = '0';
      keyTypes = [KeyType.numeric];
      calcState = CalcState.cleared;
      displayState = DisplayState.numeric;
      displayStates = [displayState];
    }

    return {
      ...state,
      result: { display, keyTypes, displayStates },
      calcState,
      displayState,
    };
  }

  function calulateResultState(state) {
    function calculateResult(input) {
      function calculate(operator, operators, numbers, calcFunction) {
        let workingOperator = operators.indexOf(operator);
        while (workingOperator !== -1) {
          const result = calcFunction(numbers[workingOperator], numbers[workingOperator + 1]);
          numbers.splice(workingOperator, 2, result);
          operators.splice(workingOperator, 1);
          workingOperator = operators.indexOf(operator);
        }
      }

      const inputString = String(input);
      const numbers = inputString.split(/\+|-|×|÷/g);
      const operators = inputString.replace(/[0-9]|\./g, '').split('');

      // Calculate the result using the operators in the correct order
      calculate('÷', operators, numbers, (leftNumber, rightNumber) => leftNumber / rightNumber);
      calculate('×', operators, numbers, (leftNumber, rightNumber) => leftNumber * rightNumber);
      calculate('-', operators, numbers, (leftNumber, rightNumber) => leftNumber - rightNumber);
      // Use of parseFloat to avoid string concatenation
      calculate('+', operators, numbers, (leftNumber, rightNumber) => parseFloat(leftNumber) + parseFloat(rightNumber));

      return numbers[0];
    }

    const display = calculateResult(state.result.display);
    const keyTypes = [KeyType.numeric];
    const displayStates = [DisplayState.numeric];
    
    return {
      ...state,
      result: { display, keyTypes, displayStates },
      calcState: CalcState.resulted,
      displayState: DisplayState.numeric,
    };
  }

  const validCombinations = [
    DisplayState.numeric + KeyType.numeric,
    DisplayState.numeric + KeyType.operator,
    DisplayState.numeric + KeyType.dot,

    DisplayState.dot + KeyType.numeric,

    DisplayState.decimal + KeyType.numeric,
    DisplayState.decimal + KeyType.operator,

    DisplayState.operator + KeyType.numeric,
  ];

  if (keyType === KeyType.result) {
    return calulateResultState(state);
  }
  if (keyType === KeyType.clear) {
    return clearLast(state);
  }
  if (
    (state.calcState === CalcState.cleared
      || state.calcState === CalcState.resulted)
    && keyType === KeyType.numeric
  ) {
    return initialState(state, keyValue, keyType);
  }

  const combination = state.displayState + keyType;

  if (validCombinations.includes(combination)) {
    return concat(state, keyValue, keyType);
  }

  return state;
}

export default calculateState;
