import React from 'react';
import { mount } from 'enzyme';
import Toolbar from '../toolbar';

describe('Toolbar Component', () => {
  it('should render a basic component', () => {
    const props = {};

    const component = mount(<Toolbar {...props}>test</Toolbar>);

    expect(component.render()).toMatchSnapshot();
  });
});
