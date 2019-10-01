import React from 'react';
import { shallow } from 'enzyme';

import MovieCard from './movieCard';
import { findByTestAttr, checkProps } from '../../../test/testUtils';

const defaultProps = {
    poster: 'poster_url',
    title: 'string',
    type: 'string',
    year: 'string',
    onClick: () => 'ok' 
}

const setup = (props={}) => {
    const setupProps = {...defaultProps, ...props}
    return shallow(<MovieCard {...setupProps} />)
}

test('renders wihtout error', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'movie-card');
    expect(component.length).toBe(1);
});

test('renders Canvas when prop "poster" is "N/A"', () => {
    const wrapper = setup({poster: 'N/A'});
    const canvas = findByTestAttr(wrapper, 'poster-canvas');
    const poster = findByTestAttr(wrapper, 'poster');
    expect(canvas.length).toBe(1)
    expect(poster.length).not.toBe(1)
});

test('renders Poster when prop "poster" is string', () => {
    const wrapper = setup();
    const canvas = findByTestAttr(wrapper, 'poster-canvas');
    const poster = findByTestAttr(wrapper, 'poster');
    expect(canvas.length).not.toBe(1)
    expect(poster.length).toBe(1)
})

test('does not throw warning with expected props', () => {
    checkProps(MovieCard, defaultProps);
})
