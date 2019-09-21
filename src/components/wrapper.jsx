import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    position: relative;
    display: block;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    box-sizing: border-box;
`

const Wrapper = ({children}) => {
    return(
        <Container>{children}</Container>
    )
}

export { Wrapper };
