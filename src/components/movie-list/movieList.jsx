import React, { Component } from 'react';

import './item-list.css';
import SwapiService from '../../services/swapiservices';
import Moviedetails from '../movie-details';

export default class MovieList extends Component {
    swapiService = new SwapiService();

    state = {
        movies: [],
    };

    componentDidMount() {
        this.update();
    }

    update() {
        this.swapiService.getMovies('1812').then(movies => {
            this.setState({
                movies,
            });
        });
    }

    render() {
        const { movies } = this.state;
        return (
            <div className="list">
                {movies.length > 0 &&
                    movies.map(movie => {
                        return (
                            <Moviedetails
                                title={movie.original_title}
                                date={movie.release_date}
                                poster={movie.poster_path}
                                genre={movie.genre_ids}
                                text={movie.overview}
                                key={movie.original_title}
                            />
                        );
                    })}
            </div>
        );
    }
}
