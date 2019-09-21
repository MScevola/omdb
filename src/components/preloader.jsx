import React from 'react';
import styled from 'styled-components';

import loaderGif from '../assets/preloader.gif';

const PreloaderContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const Preloader = () => {

    return(
        <PreloaderContainer>
            <img src={loaderGif} alt="loading..." />
        </PreloaderContainer>
    )
}

export { Preloader };
