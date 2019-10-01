import React from 'react';
import { shallow } from 'enzyme';

import CloseButton from './closeButton';
import { findByTestAttr, checkProps } from '../../../test/testUtils';

const defaultProps = {
    isFavorite: false
}

const setup = (props={}) => {
    const setupProps = {...defaultProps, ...props}
    return shallow(<CloseButton {...setupProps} />)
}

test('renders wihtout error', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'close-button');
    expect(component.length).toBe(1);
});

test('does not throw warning with expected props', () => {
    const expectedProps = { onClick: () => 'ok' };
    checkProps(CloseButton, expectedProps);
})
