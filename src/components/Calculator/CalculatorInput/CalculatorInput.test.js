import React from 'react';
import { shallow } from 'enzyme';
import CalculatorInput from './CalculatorInput';
import { KeyType } from '../common/enums';

describe('CalculatorInput', () => {
  const clickFn = jest.fn();

  it('should render correctly', () => {
    const component = shallow(<CalculatorInput />);

    expect(component).toMatchSnapshot();
  });

  it('button click should propogate the button value', () => {
    const component = shallow(<CalculatorInput onInput={clickFn} />);
    component
      .find('Button[value="="]')
      .simulate('click');

    expect(clickFn).toHaveBeenCalledWith({ keyValue: '=', keyType: KeyType.result });
  });
});
