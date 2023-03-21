import React, { Component } from 'react';

import './movielist.css';
import MovieItem from '../MovieItem';

export default class MovieList extends Component {
  render() {
    const { Movies, loading } = this.props;
    return (
      <ul className="movie-list">
        {Movies.map((item) => {
          const { id } = item;
          return <MovieItem Movies={item} key={id} loading={loading} />;
        })}
      </ul>
    );
  }
}
