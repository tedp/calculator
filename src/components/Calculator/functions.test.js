import { KeyType, DisplayState, CalcState } from './common/enums';
import calculateState from './functions';


describe('calculator', () => {
  let initialState;

  beforeEach(() => {
    const keyTypes = [
      KeyType.numeric,
      KeyType.operator,
      KeyType.numeric,
    ];

    const displayStates = [
      DisplayState.numeric,
      DisplayState.operator,
      DisplayState.numeric,
    ];

    initialState = {
      result: { display: '1+1', keyTypes, displayStates },
      calcState: CalcState.input,
      displayState: DisplayState.numeric,
    };
  });

  describe('calculateState', () => {
    it('should clear one character from the right', () => {
      const actual = calculateState(initialState, 'c', KeyType.clear);

      expect(actual).toMatchSnapshot();
      expect(actual.result.display).toEqual('1+');
    });

    it('should concat operators after the caclulator has been resulted', () => {
      const state = calculateState(initialState, '=', KeyType.result);
      const actual = calculateState(state, '+', KeyType.operator);

      expect(actual).toMatchSnapshot();
      expect(actual.result.display).toEqual('2+');
    });

    it('should clear displayed value after the caclulator has been resulted when number input', () => {
      const state = calculateState(initialState, '=', KeyType.result);
      const actual = calculateState(state, '1', KeyType.numeric);

      expect(actual).toMatchSnapshot();
      expect(actual.result.display).toEqual('1');
    });

    it('should not concat numeric values after all input has been cleared', () => {
      let state = calculateState(initialState, 'c', KeyType.clear);
      state = calculateState(state, 'c', KeyType.clear);
      state = calculateState(state, 'c', KeyType.clear);
      const actual = calculateState(state, '1', KeyType.numeric);

      expect(actual).toMatchSnapshot();
      expect(actual.result.display).toEqual('1');
    });

    it('should concat numeric if current display is `1+1`', () => {
      const actual = calculateState(initialState, '1', KeyType.numeric);

      expect(actual).toMatchSnapshot();
      expect(actual.result.display).toEqual('1+11');
    });

    it('should concat operator if current display is `1+1`', () => {
      const actual = calculateState(initialState, '+', KeyType.operator);

      expect(actual).toMatchSnapshot();
      expect(actual.result.display).toEqual('1+1+');
    });

    it('should concat decimal if display is `1+1`', () => {
      const actual = calculateState(initialState, '.', KeyType.dot);

      expect(actual).toMatchSnapshot();
      expect(actual.result.display).toEqual('1+1.');
    });

    it('should concat numeric if current display is `1+1+`', () => {
      const state = calculateState(initialState, '+', KeyType.operator);
      expect(state.displayState).toEqual(DisplayState.operator);

      const actual = calculateState(state, '1', KeyType.numeric);

      expect(state).toMatchSnapshot();
      expect(actual.result.display).toEqual('1+1+1');
    });

    it('should not concat operator if display is `1+1+`', () => {
      const state = calculateState(initialState, '+', KeyType.operator);
      expect(state.result.display).toEqual('1+1+');
      expect(state.displayState).toEqual(DisplayState.operator);

      const actual = calculateState(state, '+', KeyType.operator);

      expect(state).toMatchSnapshot();
      expect(actual.result.display).toEqual('1+1+');
    });

    it('should not concat decimal if display is `1+1+`', () => {
      const state = calculateState(initialState, '+', KeyType.operator);
      expect(state.result.display).toEqual('1+1+');
      expect(state.displayState).toEqual(DisplayState.operator);

      const actual = calculateState(state, 'dot', KeyType.dot);

      expect(state).toMatchSnapshot();
      expect(actual.result.display).toEqual('1+1+');
    });

    it('should concat numeric if display is `1+1.`', () => {
      const state = calculateState(initialState, '.', KeyType.dot);
      expect(state.result.display).toEqual('1+1.');
      expect(state.displayState).toEqual(DisplayState.dot);

      const actual = calculateState(state, '1', KeyType.numeric);

      expect(state).toMatchSnapshot();
      expect(actual.result.display).toEqual('1+1.1');
    });

    it('should not concat decimal if display is `1+1.`', () => {
      const state = calculateState(initialState, '.', KeyType.dot);
      expect(state.result.display).toEqual('1+1.');
      expect(state.displayState).toEqual(DisplayState.dot);

      const actual = calculateState(state, 'dot', KeyType.dot);

      expect(state).toMatchSnapshot();
      expect(actual.result.display).toEqual('1+1.');
    });

    it('should not concat operator if display is `1+1.`', () => {
      const state = calculateState(initialState, '.', KeyType.dot);
      expect(state.result.display).toEqual('1+1.');
      expect(state.displayState).toEqual(DisplayState.dot);

      const actual = calculateState(state, '+', KeyType.operator);

      expect(state).toMatchSnapshot();
      expect(actual.result.display).toEqual('1+1.');
    });

    it('should concat operator if display is `1+1.1`', () => {
      let state = calculateState(initialState, '.', KeyType.dot);
      state = calculateState(state, '1', KeyType.numeric);
      expect(state.result.display).toEqual('1+1.1');
      expect(state.displayState).toEqual(DisplayState.decimal);

      const actual = calculateState(state, '+', KeyType.operator);

      expect(state).toMatchSnapshot();
      expect(actual.result.display).toEqual('1+1.1+');
    });

    it('should concat numeric if display is `1+1.1`', () => {
      let state = calculateState(initialState, '.', KeyType.dot);
      state = calculateState(state, '1', KeyType.numeric);
      expect(state.result.display).toEqual('1+1.1');
      expect(state.displayState).toEqual(DisplayState.decimal);

      const actual = calculateState(state, '1', KeyType.numeric);

      expect(state).toMatchSnapshot();
      expect(actual.result.display).toEqual('1+1.11');
    });

    it('should not concat decimal if display is `1+1.1`', () => {
      let state = calculateState(initialState, '.', KeyType.dot);
      state = calculateState(state, '1', KeyType.numeric);
      expect(state.result.display).toEqual('1+1.1');
      expect(state.displayState).toEqual(DisplayState.decimal);

      const actual = calculateState(state, '.', KeyType.dot);

      expect(state).toMatchSnapshot();
      expect(actual.result.display).toEqual('1+1.1');
    });
  });

  describe('calulateResultState', () => {
    it('should calculate the result', () => {
      const actual = calculateState(initialState, '=', KeyType.result);

      expect(actual).toMatchSnapshot();
      expect(actual.result.display).toEqual(2);
      expect(actual.result.keyTypes).toEqual([KeyType.numeric])
      expect(actual.result.displayStates).toEqual([DisplayState.numeric])
    });

    it('should calculate the result applying the operators in the correct order `/ * - +`', () => {
      let state = calculateState(initialState, '÷', KeyType.operator);
      state = calculateState(state, '1', KeyType.numeric);
      state = calculateState(state, '×', KeyType.operator);
      state = calculateState(state, '2', KeyType.numeric);
      state = calculateState(state, '-', KeyType.operator);
      state = calculateState(state, '2', KeyType.numeric);
      state = calculateState(state, '.', KeyType.dot);
      state = calculateState(state, '1', KeyType.numeric);
      const actual = calculateState(state, '=', KeyType.result);

      expect(actual).toMatchSnapshot();
      expect(actual.result.display).toEqual(0.8999999999999999);
    });
  });
});
