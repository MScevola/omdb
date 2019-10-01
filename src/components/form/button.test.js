import React from 'react';
import { shallow } from 'enzyme';

import Button from './button';
import { findByTestAttr, checkProps } from '../../../test/testUtils';

const defaultProps = {
    isFavorite: false
}

const setup = (props={}) => {
    const setupProps = {...defaultProps, ...props}
    return shallow(<Button {...setupProps} />)
}

test('renders wihtout error', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'button');
    expect(component.length).toBe(1);
});

test('does not throw warning with expected props', () => {
    const expectedProps = { onClick: () => 'ok' };
    checkProps(Button, expectedProps);
})
