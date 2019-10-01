import React from 'react';
import { shallow } from 'enzyme';

import GuessWords from './GuessWords';
import { findByTestAttr, checkProps } from '../../test/testUtils';

const defaultProps = {
    guessedWords: [{
        guessedWord: 'train',
        letterMatchCount: 3
    }],
};

const setup = (props={}) => {
    const setupProps = {...defaultProps, ...props};
    return shallow(<GuessWords {...setupProps} />)
}

test('does not throww warning with expected props', () => {
    checkProps(GuessWords, defaultProps);
})

describe('if there are no words guessed', () => {
    test('renders without error', () => {
        const wrapper = setup({ guessedWords: [] })
        const component = findByTestAttr(wrapper, 'component-guessed-words')
        expect(component.length).toBe(1)
    })

    test('renders instructions to guess a word', () => {
        const wrapper = setup({ guessedWords: [] })
        const instructions = findByTestAttr(wrapper, 'guess-instructions')
        expect(instructions.text().length).not.toBe(0)
    })
})

describe('if there are words guessed', () => {
    const guessedWords = [
        { guessedWord: 'train', letterMatchCount: 3 },
        { guessedWord: 'agile', letterMatchCount: 1 },
        { guessedWord: 'party', letterMatchCount: 5 },
    ]

    let wrapper

    beforeEach(() => {
        wrapper = setup({ guessedWords });
    })

    test('renders without error', () => {
        const component = findByTestAttr(wrapper, 'component-guessed-words')
        expect(component.length).toBe(1)
    })

    test('renders `guessed words` section', () => {
        const guessedWordsNode = findByTestAttr(wrapper, 'guessed-words')
        expect(guessedWordsNode.length).toBe(1)
    })

    test('correct number of guessed words', () => {
        const guessedWordsNodes = findByTestAttr(wrapper, 'guessed-word')
        expect(guessedWordsNodes.length).toBe(guessedWords.length)
    })
})
