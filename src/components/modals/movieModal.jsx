import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { CloseButton } from '../form';
import { Wrapper } from '../wrapper';

const Modal = styled.div`
    position: fixed;
    display: block;
    width: 100vw;
    height: calc(100% - 80px);
    top: 0;
    left: 0;
    background: #dedede;
    transform: translate(0, 100vh);
    overflow: auto;
    transition: all .3s ease-in-out;
    z-index: 10;

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
        <Modal className={modalStyles} data-test='component-modal'>
            <header className={headerStyles}>
                <div className="close-button"><CloseButton onClick={onClick} /></div>
                <Wrapper>
                    <h1 className='title'>{movie.Title} ({movie.Year})</h1>
                    { movie.Language !== 'N/A' ? <span className="info">{movie.Language}</span> : '' }
                    { movie.Country !== 'N/A' ? <span className="info">{movie.Country}</span> : '' }
                    { movie.Genre !== 'N/A' ? <span className="info">{movie.Genre}</span> : '' }
                    <div className="img-container">
                        { movie.Poster !== 'N/A' ? <img src={movie.Poster} alt={movie.Title} data-test='bemloco' id={'bemloco'}/> : '' }
                    </div>
                    { movie.Awards !== 'N/A' ? <span className="info">{movie.Awards}</span> : '' }
                </Wrapper>
            </header>
            <main>
                <div className="movie-info">
                    <Wrapper>
                        { movie.Website && movie.Website !== 'N/A' ? <a href={movie.Website} target='_blank' rel="noopener noreferrer"><span className="website">Go to {movie.Title} Website</span></a> : '' }
                        { movie.Plot !== 'N/A' ? <div className="plot">{movie.Plot}</div> : '' }
                        { movie.Director !== 'N/A' ? <span className="info"><strong>Director: </strong>{movie.Director}</span> : '' }
                        { movie.Actors !== 'N/A' ? <span className="info"><strong>Actors: </strong>{movie.Actors}</span> : '' }
                        { movie.Writer !== 'N/A' ? <span className="info"><strong>Writer: </strong>{movie.Writer}</span> : '' }
                        { movie.Production && movie.Production !== 'N/A' ? <span className="info"><strong>Production: </strong>{movie.Production}</span> : '' }
                    </Wrapper>
                </div>
            </main>
        </Modal>
    )
}

MovieModal.propTypes = {
    movie: PropTypes.arrayOf(PropTypes.shape({
        Title: PropTypes.string,
        Year: PropTypes.string,
        Language: PropTypes.string,
        Country: PropTypes.string,
        Genre: PropTypes.string,
        Poster: PropTypes.string,
        Awards: PropTypes.string,
        Website: PropTypes.string,
        Plot: PropTypes.string,
        Director: PropTypes.string,
        Actors: PropTypes.string,
        Writer: PropTypes.string,
        Production: PropTypes.string
    })).isRequired,
    open: PropTypes.bool,
    onClick: PropTypes.func
}

export default MovieModal;