import React, { useState } from 'react';
import { Input, Button } from '../components/form';
import styled from 'styled-components';
import classNames from 'classnames';
import { debounce } from 'lodash';

import * as AMDB_SERVICES from '../actions/index';

import { MovieList } from '../components/movieList';
import { MovieCard } from '../components/cards';
import { Wrapper } from '../components/wrapper';
import { MovieModal } from '../components/modals';

import { useStateValue } from '../contexts/omdbContext';

import icons from '../assets/230394-cinema.png';

const View = styled.div`
    position: relative;
    display: block;
    height: 100%;
    background: #ededed;

    .search-container{
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
        height: calc(100% - 166px);
        overflow: auto;

        &.initial{
            background: url(${icons}) no-repeat center;
            background-size: 180px;
        }

        .warning{
            position: relative;
            display: block;
            margin: 80px auto;
            text-align: center;
            font-size: 24px;
            color: #444;

            strong{
                position: relative;
                display: block;
                margin: 0 auto;
            }
        }
    }

    .load-more-container{
        position: relative;
        display: block;
        padding: 0 20px;
    }
`

const Home = () => {
    const [{ favorites }, dispatch] = useStateValue()
    const [list, setList] = useState([])
    const [page, setPage] = useState(1)
    const [loadMore, setLoadMore] = useState(false)
    const [term, setTerm] = useState('')
    const [inputTerm, setInputTerm] = useState(term)
    const [selectedMovie, setSelectedMovie] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [comunication, setComunication] = useState('initial')

    const handleSearch = async term => {
        setPage(1)
        setTerm(term)
        
        const response = await AMDB_SERVICES.getMoviesBySearch(term, page)
        if (response.Response === 'True') {
            setList(response.Search)
            setComunication('')
            response.totalResults > (list.length + response.Search.length) ? setLoadMore(true) : setLoadMore(false)
        }else{
            setList([])
            setLoadMore(false)
            setComunication(response.Error)
        }
    }

    const handleOnChange = debounce(value => {
        handleSearch(value)
    }, 300)

    const handleLoadMore = async () => {
        setPage(page + 1)
        const response = await AMDB_SERVICES.getMoviesBySearch(term, page + 1)
        if (response.Response === 'True') {
            setList(list.concat(response.Search))
            response.totalResults > (list.length + response.Search.length) ? setLoadMore(true) : setLoadMore(false)
        }else{
            setList(list)
        }
    }

    const openMovieModal = async id => {
        const getMovie = await AMDB_SERVICES.getMoviesById(id)
        setSelectedMovie(getMovie)
        setModalOpen(true)
    }

    const resultsStyles = classNames({
        "results-container": true,
        "initial": (comunication === 'initial')
    })

    const addFavorite = (favorite) => {
        dispatch({
            type: 'addFavorite',
            newFavorite: favorites.concat(favorite)
        })
    }

    return(
        <View>
            <div className="search-container">
                <Wrapper>
                    <h1 className='page-title' >Open Movie Database</h1>
                    <Input name='Search' type='text' value={inputTerm} onChange={e => setInputTerm(e.target.value) & handleOnChange(e.target.value)} placeholder='Digite um título' />
                </Wrapper>
            </div>
            <div className={resultsStyles}>
                <Wrapper>
                    {
                        comunication && comunication !== 'initial' ? <span className="warning"><strong>"{term}"</strong>{comunication}</span> : ''
                    }
                    <MovieList>
                    {
                        list.map((item, index) => {
                            return(
                                <li key={index}>
                                    <div onClick={() => addFavorite(item)}>Favoritar</div>
                                    <MovieCard poster={item.Poster} title={item.Title} type={item.Type} year={item.Year} onClick={() => openMovieModal(item.imdbID)} />
                                </li>
                            )
                        })
                    }
                    </MovieList>
                    <div className="load-more-container">
                        { loadMore ? <Button onClick={() => handleLoadMore()}>Carregar mais</Button> : '' }
                    </div>
                </Wrapper>
            </div>
            <MovieModal movie={selectedMovie} open={modalOpen} onClick={() => setModalOpen(false)} />
        </View>
    )
}

export default Home;
