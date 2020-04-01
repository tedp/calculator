import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';


describe('Button', () => {
  const clickFn = jest.fn();

  it('should render correctly', () => {
    const component = shallow(<Button />);

    expect(component).toMatchSnapshot();
  });

  it('should render button correctly with given value', () => {
    const value = 'value';
    const component = shallow(<Button value={value} />);

    expect(component).toMatchSnapshot();
  });

  it('button click should provide button value', () => {
    const value = 'value';
    const component = shallow(<Button value={value} onClick={clickFn} />);
    component.simulate('click');

    expect(clickFn).toHaveBeenCalledWith(value);
  });
});
