import React, { useState } from 'react';
import { Input, Button } from '../components/form';
import styled from 'styled-components';
import { debounce } from 'lodash';

import * as AMDB_SERVICES from '../actions/index';

import MovieList from '../components/movieList';
import { MovieCard } from '../components/cards';
import { Wrapper } from '../components/wrapper';
import { MovieModal } from '../components/modals';
import FavoriteButton from '../components/favoriteButton';

import { ADD_FAVORITE } from '../actions/actionTypes';
import { useStateValue } from '../contexts/omdbContext';

import iconMovie from '../assets/icon-movie.jpg';
import iconSerie from '../assets/icon-tv.png';
import iconGame from '../assets/icon-game.jpg';

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

        .warning{
            position: relative;
            display: block;
            margin: 80px auto;
            padding: 0 20px;
            text-align: center;
            font-size: 24px;
            color: #444;

            strong{
                position: relative;
                display: block;
                margin: 0 auto;
            }
        }

        .filters{
            position: relative;
            display: block;
            margin: 20px auto;
            padding: 0 20px;
            text-align: center;
            font-size: 24px;
            color: #f08048;

            span{
                color: #666;
                font-size: 14px;
            }

            ul{
                position: relative;
                display: block;
                padding: 0;
                margin: 20px auto;
                list-style: none;

                li{
                    position: relative;
                    display: inline-block;
                    margin: 0 10px;
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    overflow: hidden;

                    button{
                        display: block;
                        margin: 0;
                        padding: 0;
                        background: none;
                        border: none;
                    }

                    img{
                        width: 100%;
                    }
                }
            }
        }
    }

    .load-more-container{
        position: relative;
        display: block;
        padding: 0 20px;
    }

    .favorite{
        position: absolute;
        z-index: 2;
        top: 26px;
        right: 10px;
        background: #666;
        width: 28px;
        height: 28px;
        border-radius: 50%;

        img{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 14px;
        }
    }
`

const Home = () => {
    const [{ favorites }, dispatch] = useStateValue() //State consumed from the Context

    // Local states
    const [list, setList] = useState([])
    const [page, setPage] = useState(1)
    const [loadMore, setLoadMore] = useState(false)
    const [term, setTerm] = useState('')
    const [inputTerm, setInputTerm] = useState(term)
    const [selectedMovie, setSelectedMovie] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [comunication, setComunication] = useState('initial')
    const [type, setType] = useState(null)
    // Local states

    const handleSearch = async (term, type) => {
        setPage(1)
        setTerm(term)
        
        const response = await AMDB_SERVICES.getMoviesBySearch(term, page, type)
        if (response.Response === 'True') {
            setList(response.Search)
            setComunication('')
            response.totalResults > (list.length + response.Search.length) ? setLoadMore(true) : setLoadMore(false)
        }else{
            setList([])
            setLoadMore(false)
            if(term !== '')
                setComunication(response.Error)
            else
                setComunication('initial')
        }
    }

    const handleOnChange = debounce(value => {
        handleSearch(value)
    }, 300)

    const handleLoadMore = async () => {
        setPage(page + 1)
        const response = await AMDB_SERVICES.getMoviesBySearch(term, page + 1, type)
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

    const addFavorite = (item) => {
        const isFavorite = favorites.filter(favorite => (favorite.imdbID === item.imdbID)).length

        if(!isFavorite)
            dispatch({
                type: ADD_FAVORITE,
                newFavorite: favorites.concat(item)
            })
    }

    return(
        <View>
            <div className="search-container">
                <Wrapper>
                    <h1 className='page-title' >Open Movie Database</h1>
                    <Input name='Search' type='text' value={inputTerm} onChange={e => setInputTerm(e.target.value) & handleOnChange(e.target.value)} placeholder='Try typing a movie title' />
                </Wrapper>
            </div>
            <div className="results-container">
                <Wrapper>
                    {/* Defines what to show to the user, according to the search result */}
                    {
                        comunication && comunication !== 'initial' ? 
                        <span className="warning"><strong>"{term}"</strong>{comunication}</span> : 
                        <div className="filters">
                            <span>Filter by Movies, TV shows or Games</span>
                            <ul>
                                <li><button onClick={() => setType('movie') & handleSearch(term, 'movie')}><img src={iconMovie} alt="movies"/></button></li>
                                <li><button onClick={() => setType('series') & handleSearch(term, 'series')}><img src={iconSerie} alt="series"/></button></li>
                                <li><button onClick={() => setType('game') & handleSearch(term, 'game')}><img src={iconGame} alt="games"/></button></li>
                            </ul>
                        </div>
                    }
                    {/* Defines what to show to the user, according to the search result */}

                    {/* Start Movie List */}
                    <MovieList>
                    {
                        list.map((item, index) => {
                            const isFavorite = favorites.filter(favorite => (favorite.imdbID === item.imdbID)).length

                            return(
                                <li key={index}>
                                    <FavoriteButton onClick={() => addFavorite(item)} className="favorite" isFavorite={isFavorite !== 0} />
                                    <MovieCard poster={item.Poster} title={item.Title} type={item.Type} year={item.Year} onClick={() => openMovieModal(item.imdbID)} />
                                </li>
                            )
                        })
                    }
                    </MovieList>
                    {/* End Movie List */}

                    {/* Print Load More Button if there is more items to load */}
                    <div className="load-more-container">
                        { loadMore ? <Button onClick={() => handleLoadMore()}>Carregar mais</Button> : '' }
                    </div>
                    {/* Print Load More Button if there is more items to load */}
                </Wrapper>
            </div>
            <MovieModal movie={selectedMovie} open={modalOpen} onClick={() => setModalOpen(false)} />
        </View>
    )
}

export default Home;
