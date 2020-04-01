import React from 'react';
import './Calculator.scss';
import { CalcState, KeyType, DisplayState } from './common/enums';
import ResultDisplay from './ResultDisplay/ResultDisplay';
import CalculatorInput from './CalculatorInput/CalculatorInput';
import calculateState from './functions';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);

    this.state = {
      result: { display: '0', keyTypes: [KeyType.numeric], displayStates: [DisplayState.numeric] },
      calcState: CalcState.cleared,
      displayState: DisplayState.numeric,
      lastKeyType: KeyType.numeric,
    };
  }

  handleInput(button) {
    const state = calculateState(this.state, button.keyValue, button.keyType);
    this.setState(state);
  }

  render() {
    return (
      <div className="Calculator">
        <ResultDisplay displayValue={this.state.result.display} />
        <CalculatorInput onInput={this.handleInput} />
      </div>
    );
  }
}

export default Calculator;
