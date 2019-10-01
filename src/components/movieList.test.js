import React from 'react';
import { shallow } from 'enzyme';

import MovieList from './movieList';
import { findByTestAttr, checkProps } from '../../test/testUtils';

const defaultProps = {
    children: 'string'
}

const setup = (props={}) => {
    const setupProps = {...defaultProps, ...props}
    return shallow(<MovieList {...setupProps} />)
}

test('renders wihtout error', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'movie-list');
    expect(component.length).toBe(1);
});

test('does not throw warning with expected props', () => {
    checkProps(MovieList, defaultProps);
})
