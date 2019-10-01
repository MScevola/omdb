import React from 'react';
import { shallow } from 'enzyme';

import FavoriteButton from './favoriteButton';
import { findByTestAttr, checkProps } from '../../test/testUtils';

const defaultProps = {
    isFavorite: false
}

const setup = (props={}) => {
    const setupProps = {...defaultProps, ...props}
    return shallow(<FavoriteButton {...setupProps} />)
}

test('renders wihtout error', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'favorite-button');
    expect(component.length).toBe(1);
});

test('renders "full heart" when prop "isFavorite" is truth', () => {
    const wrapper = setup({isFavorite: true});
    const component = findByTestAttr(wrapper, 'is-favorite');
    expect(component.length).toBe(1)
});

test('renders "empty heart" when prop "isFavorite" is false', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'not-favorite');
    expect(component.length).toBe(1);
})

test('does not throw warning with expected props', () => {
    const expectedProps = { onClick: () => 'ok' };
    checkProps(FavoriteButton, expectedProps);
})
