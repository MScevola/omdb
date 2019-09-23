import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

import { CloseButton } from '../form';

const Modal = styled.div`
    position: fixed;
    display: block;
    width: 100vw;
    height: 100%;
    top: 0;
    left: 0;
    background: #dedede;
    transform: translate(0, 100vh);
    overflow: auto;
    transition: all .3s ease-in-out;

    &.open{
        transform: none;
    }

    header{
        position: relative;
        display: block;
        padding: 60px 20px 20px;
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

        &.movie{
            background: #25ae88;
        }

        &.series{
            background: #ebba16;
        }

        &.episode{
            background: #424a60;
        }

        &.game{
            background: #1081e0;
        }

        .close-button{
            position: absolute;
            top: 20px;
            right: 20px;
        }
    }

    main{
        position: relative;
        display: block;
        height: auto;
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

const MovieModal = ({ movie, open, onClick }) => {

    const modalStyles = classNames({
        'open': open
    })

    const headerStyles = classNames({
        'movie': (movie.Type === 'movie'),
        'series': (movie.Type === 'series'),
        'episode': (movie.Type === 'episode'),
        'game': (movie.Type === 'game')
    })

    return(
        <Modal className={modalStyles}>
            <header className={headerStyles}>
                <div className="close-button"><CloseButton onClick={onClick} /></div>
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
        </Modal>
    )
}

export default MovieModal;