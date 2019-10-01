import React from 'react';
import { shallow } from 'enzyme';

import MovieModal from './movieModal';
import { findByTestAttr, checkProps,findByIdAttr } from '../../../test/testUtils';

const defaultProps = {
    movie: [{
        Title: 'string',
        Year: 'string',
        Language: 'string',
        Country: 'string',
        Genre: 'string',
        Poster: 'string',
        Awards: 'string',
        Website: 'string',
        Plot: 'string',
        Director: 'string',
        Actors: 'string',
        Writer: 'string',
        Production: 'string'
    }],
    open: true,
    onClick: () => 'ok' 
}

const setup = (props={}) => {
    const setupProps = {...defaultProps, ...props}
    return shallow(<MovieModal {...setupProps} />)
}

test('renders wihtout error', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'component-modal');
    expect(component.length).toBe(1);
});

test('does not throw warning with expected props', () => {
    checkProps(MovieModal, defaultProps);
})
