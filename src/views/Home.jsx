import React, { useState } from 'react';
import { Input, Button } from '../components/form';
import styled from 'styled-components';
import { debounce } from 'lodash';

import * as AMDB_SERVICES from '../actions/index';

import { MovieList } from '../components/movieList';
import { MovieCard } from '../components/cards';
import { Wrapper } from '../components/wrapper';

import { useStateValue } from '../contexts/omdbContext';
import { MovieModal } from '../components/modals';

const View = styled.div`
    position: relative;
    display: block;
    height: 100%;

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
    }

    .load-more-container{
        position: relative;
        display: block;
        padding: 0 20px;
    }
`

const Home = () => {
    const [{ term }, dispatch] = useStateValue()
    const [list, setList] = useState([])
    const [page, setPage] = useState(1)
    const [loadMore, setLoadMore] = useState(false)
    const [inputTerm, setInputTerm] = useState(term)
    const [selectedMovie, setSelectedMovie] = useState([])
    const [modalOpen, setModalOpen] = useState(false)

    const handleSearch = async term => {
        setPage(1)
        dispatch({
            type: 'changeSearchTerm',
            newSearchTerm: term
        })
        const response = await AMDB_SERVICES.getMoviesBySearch(term, page)
        if (response.Response === 'True') {
            setList(response.Search)
            response.totalResults > (list.length + response.Search.length) ? setLoadMore(true) : setLoadMore(false)
        }else{
            setList([])
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

    return(
        <View>
            <div className="search-container">
                <Wrapper>
                    <h1 className='page-title' >Open Movie Database</h1>
                    <Input name='Search' type='text' value={inputTerm} onChange={e => setInputTerm(e.target.value) & handleOnChange(e.target.value)} placeholder='Digite um título' />
                </Wrapper>
            </div>
            <div className="results-container">
                <Wrapper>
                    <MovieList>
                        {
                            list.map((item, index) => {
                                return(
                                    <li key={index}>
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
