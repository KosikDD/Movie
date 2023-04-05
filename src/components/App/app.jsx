import React, { Component } from 'react';
import { debounce } from 'lodash';

import TheMoviedb from '../../services/tmbd-service';
import './app.css';
import Header from '../Header';
import Footer from '../Footer';
import MovieList from '../MovieList';
import { GenresContext } from '../Context';
export default class App extends Component {
  TheMoviedb = new TheMoviedb();

  state = {
    movies: [],
    loading: true,
    error: false,
    errortype: '',
    page: 1,
    search: '',
    totalmovies: 0,
    genres: [],
    ratedmovies: [],
    totalrated: 0,
    tab: 'search',
  };

  onError = (e) => {
    if (e.name === 'Error') {
      this.setState({
        loading: false,
        error: true,
        errortype: e.name,
      });
    } else {
      this.setState({
        loading: false,
        error: true,
        errortype: 'noVPN',
      });
    }
  };

  onLoadRatedMovies = (ratedmovies) => {
    return this.setState({
      ratedmovies: ratedmovies.results,
      error: false,
      totalratedmovies: ratedmovies.total_results,
    });
  };

  onLoadMovies = (movies) => {
    return this.setState({
      movies: movies.results,
      loading: false,
      error: false,
      totalmovies: movies.total_results,
    });
  };

  getMovies() {
    this.TheMoviedb.getPopularMovies()
      .then((movies) => {
        this.onLoadMovies(movies);
      })
      .catch(this.onError);
  }

  searchMovie(query) {
    this.TheMoviedb.searchMovies(query)
      .then((movies) => {
        if (movies.results.length === 0) {
          throw new Error();
        }
        this.onLoadMovies(movies);
      })
      .catch(this.onError);
  }

  onClickPage = (e) => {
    this.setState(() => {
      return { page: e };
    });
    window.scrollTo(0, 0);
    this.TheMoviedb.page = e;
    if (this.state.tab === 'rated') {
      this.TheMoviedb.getRatedMovies(e)
        .then((body) => {
          this.onLoadRatedMovies(body);
          this.onLoadMovies(body);
        })
        .catch(this.onError);
    } else {
      if (this.state.search === '') {
        this.getMovies();
      } else {
        this.searchMovie(this.state.search);
      }
    }
  };

  onTab = (tab) => {
    this.setState({ tab: 'rated' });
    if (tab === 'rated') {
      this.TheMoviedb.getRatedMovies(this.state.page)
        .then((body) => {
          this.onLoadMovies(body);
        })
        .catch(this.onError);
    } else {
      this.setState(() => {
        return { page: 1 };
      });
      this.TheMoviedb.page = 1;
      window.scrollTo(0, 0);
      if (this.state.search === '') {
        this.getMovies();
      } else {
        this.searchMovie(this.state.search);
      }
    }
  };

  async componentDidMount() {
    await this.TheMoviedb.createSessionID();
    await this.TheMoviedb.getRatedMovies(this.state.page)
      .then((body) => {
        this.onLoadRatedMovies(body);
      })
      .catch(this.onError);
    this.getMovies();

    this.TheMoviedb.getGenres()
      .then((data) => this.setState({ genres: data }))
      .catch((err) => err.message);
  }

  componentDidCatch() {
    this.setState({ error: true });
  }

  render() {
    const debounceHandler = debounce((query) => {
      if (query !== '') {
        this.TheMoviedb.page = 1;
        this.setState(() => {
          return { search: query, page: 1 };
        });
        this.searchMovie(query);
      } else {
        this.TheMoviedb.page = 1;
        this.setState(() => {
          return { page: 1 };
        });
        this.getMovies();
      }
    }, 700);

    const { movies, loading, error, errortype, totalmovies, genres, ratedmovies } = this.state;

    return (
      <section className="movieapp">
        <GenresContext.Provider value={genres}>
          <Header searchMovie={debounceHandler} onSearch={this.onSearch} onTab={this.onTab} />
          <section className="main">
            <MovieList
              movies={movies}
              ratedmovies={ratedmovies}
              loading={loading}
              error={error}
              errortype={errortype}
              onrate={(id, stars) => {
                this.TheMoviedb.postRatedMovies(id, stars);
              }}
            />
          </section>
          <Footer
            onClickPage={this.onClickPage}
            currentPage={this.state.page}
            error={error}
            totalmovies={totalmovies}
          />
        </GenresContext.Provider>
      </section>
    );
  }
}
