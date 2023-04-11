export default class TheMoviedb {
  _apiBase = 'https://api.themoviedb.org/3/';
  _apiKey = '616954cad9058194dbece5c19cab957a';

  constructor() {
    this.page = 1;
    this.url = new URL(this._apiBase);
  }

  async getStarted(url) {
    try {
      let NewURL = new URL(url, this.url);
      NewURL.searchParams.set('api_key', this._apiKey);
      NewURL.searchParams.set('page', this.page);
      const res = await fetch(NewURL.href);

      if (!res.ok) {
        throw new Error(`Could't fetch ${url}` + `, received ${res.status}`);
      }

      return await res.json();
    } catch (error) {
      if (error.name === 'TypeError') {
        console.log(`Could't fetch ${url}` + ', you should switch on VPN');
        throw error;
      }
      throw error;
    }
  }

  async getResourse(url, query) {
    try {
      let NewURL = new URL(url, this.url);
      NewURL.searchParams.set('api_key', this._apiKey);
      NewURL.searchParams.set('query', query);
      NewURL.searchParams.set('page', this.page);
      const res = await fetch(NewURL.href);

      if (!res.ok) {
        throw new Error(`Could't fetch ${url}` + `, received ${res.status}`);
      }

      return await res.json();
    } catch (error) {
      if (error.name === 'TypeError') {
        console.log(`Could't fetch ${url}` + ', you should switch on VPN');
        throw error;
      }
      throw error;
    }
  }

  async getPopularMovies() {
    const res = await this.getStarted('movie/upcoming');
    return res;
  }

  async searchMovies(query) {
    const res = await this.getResourse('search/movie', query);
    return res;
  }

  async getGenres() {
    let NewURL = new URL('genre/movie/list', this.url);
    NewURL.searchParams.set('api_key', this._apiKey);
    try {
      const data = await fetch(NewURL.href);
      if (!data.ok) {
        throw new Error('NO RESPONSE!');
      }
      return await data.json();
    } catch (error) {
      throw new Error(error);
    }
  }
}
