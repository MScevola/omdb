import React from 'react';
import { shallow } from 'enzyme';

import Preloader from './preloader';
import { findByTestAttr, checkProps } from '../../test/testUtils';

const setup = (props={}) => {
    return shallow(<Preloader {...props} />)
}

test('renders wihtout error', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'preloader');
    expect(component.length).toBe(1);
});
