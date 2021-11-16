import React, { useState } from 'react';
import styled from 'styled-components';

import * as AMDB_SERVICES from '../actions/index';

import { useStateValue } from '../contexts/omdbContext';

import { MovieCard } from '../components/cards';
import { MovieModal } from '../components/modals';
import { Wrapper } from '../components/wrapper';
import MovieList from '../components/movieList';

const View = styled.div`
    position: relative;
    background: #ededed;
    height: 100%;
    overflow: auto;

    .title-container{
        position: relative;
        display: block;
        margin: 0;
        padding: 20px;
        background: #f08048;
        color: white;
    }

    .page-title{
        position: relative;
        display: block;
        text-transform: capitalize;
        font-weight: 300;
        text-align: center;
        margin: 0 0 10px;
        padding: 0;
    }
    
    .results-container{
        position: relative;
        display: block;
        height: calc(100% - 88px);
        overflow: auto;
    }
`

const Favorites = () => {
    const [{ favorites }] = useStateValue()
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedMovie, setSelectedMovie] = useState([])

    const openMovieModal = async id => {
        const getMovie = await AMDB_SERVICES.getMoviesById(id)
        setSelectedMovie(getMovie)
        setModalOpen(true)
    }

    return(
        <View>
            <div className='title-container'>
                <Wrapper>
                    <h1 className='page-title' >Favorites</h1>
                </Wrapper>
            </div>
            <div className="results-container">
                <Wrapper>
                    <MovieList>
                    {
                        favorites.map((item, index) => {
                            return(
                                <li key={index}>
                                    <MovieCard poster={item.Poster} title={item.Title} type={item.Type} year={item.Year} onClick={() => openMovieModal(item.imdbID)} />
                                </li>
                            )
                        })
                    }
                    </MovieList>
                </Wrapper>
            </div>
            <MovieModal movie={selectedMovie} open={modalOpen} onClick={() => setModalOpen(false)} />
        </View>
    )
}

export default Favorites;
