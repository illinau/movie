import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatWithOptions } from 'date-fns/fp';
import { enUS } from 'date-fns/locale';
import { Tag, Empty } from 'antd';

import './movie-details.css';
import SwapiService from '../../services/swapiservices';

function formatDate(date) {
    try {
        const dateObj = new Date(date);
        const dateToString = formatWithOptions(
            { locale: enUS },
            'MMMM d, yyyy'
        );

        return dateToString(dateObj);
    } catch {
        return date;
    }
}

function moviePoster(poster) {
    const image =
        poster === '' ? (
            <Empty />
        ) : (
            <img src={`https://image.tmdb.org/t/p/w500${poster}`} alt="" />
        );

    return (
        <div className="movie-poster">
            <div className="movie-poster__img-wrapper">{image}</div>
        </div>
    );
}

function isLetterOrDigit(symbol) {
    const isLowerLetter = symbol >= 'a' && symbol <= 'z';
    const isUpperLetter = symbol >= 'A' && symbol <= 'Z';
    const isDigitSymbol = symbol >= '0' && symbol <= '9';

    return isLowerLetter || isUpperLetter || isDigitSymbol;
}

function cutOverview(txt) {
    let i = 225;
    let cutedTxt = txt.slice(0, i);
    let isDeletedAllUncompletedWords = false;

    while (!isDeletedAllUncompletedWords) {
        if (isLetterOrDigit(cutedTxt[i - 1])) {
            i -= 1;
        } else {
            isDeletedAllUncompletedWords = true;
        }
    }

    cutedTxt = cutedTxt.slice(0, i);

    return cutedTxt + (txt.length !== cutedTxt.length ? '...' : '');
}

function getGenres(genreInMovie, genreList) {
    const getTags = () => {
        return genreList.reduce((accum, current) => {
            const { id, name } = current;
            if (genreInMovie.includes(id)) {
                accum.push(<Tag key={id}>{name}</Tag>);
            }
            return accum;
        }, []);
    };
    return <div className="tags">{getTags()}</div>;
}

export default class Moviedetails extends Component {
    swapiService = new SwapiService();

    state = {
        genres: [],
    };

    componentDidMount() {
        this.update();
    }

    update() {
        this.swapiService.getGenres().then(genres => {
            this.setState({
                genres,
            });
        });
    }

    render() {
        const { title, date, poster, text, genre } = this.props;
        const { genres } = this.state;

        return (
            <div className="movie-block">
                <div>{moviePoster(poster)}</div>
                <div className="movie-description">
                    <div className="col-1">
                        <div className="description-img-wrapper">
                            <img src={poster} alt="" />
                        </div>
                        <div className="main-info-wrapper">
                            <div className="title">{title}</div>
                            <div className="date">{formatDate(date)}</div>
                            <div>{getGenres(genre, genres)}</div>
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="text">{cutOverview(text)}</div>
                    </div>
                </div>
            </div>
        );
    }
}

Moviedetails.propTypes = {
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    poster: PropTypes.string,
    text: PropTypes.string.isRequired,
    genre: PropTypes.node.isRequired,
};

Moviedetails.defaultProps = {
    poster: null,
};
