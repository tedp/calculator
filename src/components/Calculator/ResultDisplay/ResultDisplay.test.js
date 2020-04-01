import React from 'react';
import { shallow } from 'enzyme';
import ResultDisplay from './ResultDisplay';

describe('ResultDisplay', () => {
  it('should render correctly', () => {
    const displayValue = '100';
    const component = shallow(<ResultDisplay displayValue={displayValue} />);

    expect(component).toMatchSnapshot();
  });
});
