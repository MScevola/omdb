import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import * as AMDB_SERVICES from '../actions/index';

const View = styled.div`
    position: relative;
    display: block;

    header{
        position: relative;
        display: block;
        padding: 20px;
        margin-bottom: 20px;
        border-radius: 0 0 8px 8px;
        background: #25ae88;
        text-align: center;
        color: white;

        .title{
            font-size: 22px;
            font-weight: normal;
        }

        .info{
            position: relative;
            display: inline-block;
            margin: 5px 10px;
            font-size: 12px;
            font-weight: 300;
        }
    }

    main{
        position: relative;
        display: block;
        padding: 20px;
        color: #666;

        .website{
            position: relative;
            display: block;
            margin: 0 auto 10px;
            max-width: 600px;
            background: #424a60;
            color: white;
            text-align: center;
            padding: 10px;
            box-sizing: border-box;
            font-size: 14px;
            font-weight: 300;
        }

        .plot{
            position: relative;
            margin-bottom: 20px;
        }

        .info{
            position: relative;
            display: block;
            font-size: 14px;
        }
    }
`

const Movie = ({ match }) => {
    const [movie, setMovie] = useState([])

    useEffect(() => {
        let isMounted = true

        const fetchData = async () => {
            const getMovie = await AMDB_SERVICES.getMoviesById(match.params.id)

            if(isMounted)
                setMovie(getMovie)
        }

        fetchData()

        return () => {
            isMounted = false
        };
    }, [match])

        console.log(movie)


    return(
        <View>
            <header>
                <Link to='/'>Back</Link>
                <h1 className='title'>{movie.Title} ({movie.Year})</h1>
                { movie.Language !== 'N/A' ? <span className="info">{movie.Language}</span> : '' }
                { movie.Country !== 'N/A' ? <span className="info">{movie.Country}</span> : '' }
                { movie.Genre !== 'N/A' ? <span className="info">{movie.Genre}</span> : '' }
                <div className="img-container">
                    <img src={movie.Poster} alt={movie.Title}/>
                </div>
                { movie.Awards !== 'N/A' ? <span className="info">{movie.Awards}</span> : '' }
            </header>
            <main>
                <div className="movie-info">
                    { movie.Website && movie.Website !== 'N/A' ? <span className="website"><a href={movie.Website} target='_blank' rel="noopener noreferrer">{movie.Website}</a></span> : '' }
                    <div className="plot">{movie.Plot}</div>
                    { movie.Director !== 'N/A' ? <span className="info"><strong>Director: </strong>{movie.Director}</span> : '' }
                    { movie.Actors !== 'N/A' ? <span className="info"><strong>Actors: </strong>{movie.Actors}</span> : '' }
                    { movie.Writer !== 'N/A' ? <span className="info"><strong>Writer: </strong>{movie.Writer}</span> : '' }
                    { movie.Production && movie.Production !== 'N/A' ? <span className="info"><strong>Production: </strong>{movie.Production}</span> : '' }
                </div>
            </main>
        </View>
    )
}

export default Movie;