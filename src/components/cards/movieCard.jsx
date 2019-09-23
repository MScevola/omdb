import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

import noImg from '../../assets/no-image-icon.png';

const Card = styled.div`
    position: relative;
    display: block;

    .poster{
        height: 170px;

        img{
            width: 100%;
        }

        .shadow{
            position: relative;
            display: block;
            width: 100%;
            height: 160px;
            background: url(${noImg}) no-repeat center;
            background-color: rgba(0, 0, 0, .1);
            background-size: 50px;
        }
    }


    .title{
        font-size: 14px;
        font-weight: normal;
        color: #f08048;

        strong{
            font-weight: 500;
        }
    }

    .type{
        position: relative;
        display: block;
        color: white;
        text-align: center;
        font-size: 12px;
        font-weight: 300;
        padding: 0 0 2px;
        box-sizing: border-box;

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
    }
`

const MovieCard = ({ poster, title, type, year, onClick }) => {
    const typeStyles = classNames({
        'type': true,
        'movie': (type === 'movie'),
        'series': (type === 'series'),
        'episode': (type === 'episode'),
        'game': (type === 'game')
    })
    return(
        <Card onClick={onClick}>
            <div className={typeStyles}>
                {type}
            </div>
            <div className="poster">
                { poster !== 'N/A' ? <img src={poster} alt={title}/> : <div className="shadow" /> }
            </div>
            <h3 className="title"><strong>{title}</strong> ({year})</h3>
        </Card>
    )
}

export default MovieCard;