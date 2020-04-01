import React from 'react';
import './CalculatorInput.scss';
import { KeyType } from '../common/enums';
import Button from '../Button/Button';

class CalculatorInput extends React.Component {
  createButtons(buttons) {
    return buttons.map((button) => (
      <Button
        key={button.keyValue}
        value={button.keyValue}
        onClick={() => this.props.onInput(button)}
      />
    ));
  }

  render() {
    const topPanelButtons = [
      { keyValue: '+', keyType: KeyType.operator },
      { keyValue: '-', keyType: KeyType.operator },
      { keyValue: '\u00d7', keyType: KeyType.operator },
      { keyValue: '\u00f7', keyType: KeyType.operator },
    ];
    const centrePanelButtons = [
      { keyValue: '9', keyType: KeyType.numeric },
      { keyValue: '8', keyType: KeyType.numeric },
      { keyValue: '7', keyType: KeyType.numeric },
      { keyValue: '6', keyType: KeyType.numeric },
      { keyValue: '5', keyType: KeyType.numeric },
      { keyValue: '4', keyType: KeyType.numeric },
      { keyValue: '3', keyType: KeyType.numeric },
      { keyValue: '2', keyType: KeyType.numeric },
      { keyValue: '1', keyType: KeyType.numeric },
      { keyValue: '0', keyType: KeyType.numeric },
      { keyValue: '.', keyType: KeyType.dot },
      { keyValue: 'C', keyType: KeyType.clear },
    ];

    const topPanelButtonDivs = this.createButtons(topPanelButtons);
    const centrePanelButtonDivs = this.createButtons(centrePanelButtons);

    return (
      <div className="CalculatorInput">
        <div className="top-panel">
          {topPanelButtonDivs}
        </div>
        <div className="centre-panel">
          {centrePanelButtonDivs}
        </div>
        <div className="bottom-panel" id="result">
          <Button
            value="="
            onClick={() => this.props.onInput({ keyValue: '=', keyType: KeyType.result })}
          />
        </div>
      </div>
    );
  }
}

export default CalculatorInput;
