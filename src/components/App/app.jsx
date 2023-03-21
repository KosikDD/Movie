import React, { Component } from 'react';

import TheMoviedb from '../../services/tmbd-service';
import './app.css';
import Header from '../Header';
import Footer from '../Footer';
import MovieList from '../MovieList';

export default class App extends Component {
  TheMoviedb = new TheMoviedb();

  state = {
    movies: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }],
    loading: true,
    error: false,
  };

  constructor() {
    super();
    this.getMovies();
  }

  onError = (e) => {
    console.log(e);
  };

  onLoadMovies = (movies) => {
    return this.setState({
      movies,
      loading: false,
    });
  };

  getMovies() {
    this.TheMoviedb.getPopularMovies()
      .then((movies) => {
        this.onLoadMovies(movies);
      })
      .catch(this.onError);
  }

  render() {
    const { movies, loading } = this.state;
    return (
      <section className="movieapp">
        <Header />
        <section className="main">
          <MovieList Movies={movies} loading={loading} />
        </section>
        <Footer />
      </section>
    );
  }
}
