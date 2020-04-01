import React from 'react';
import { shallow, mount } from 'enzyme';
import Calculator from './Calculator';
import { KeyType } from './common/enums';

describe('CalculatorInput', () => {
  it('should render correctly', () => {
    const component = shallow(<Calculator />);

    expect(component).toMatchSnapshot();
  });

  it('should show a value of `9` in the display', () => {
    const component = mount(<Calculator />);

    component
    .find('.centre-panel .Button')
    .first()
    .simulate('click');

    expect(component).toMatchSnapshot();

    component.unmount()
  });
});
