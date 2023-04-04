export default class TheMoviedb {
  _apiBase = 'https://api.themoviedb.org/3/';
  _apiKey = '?api_key=616954cad9058194dbece5c19cab957a';

  constructor() {
    this.page = 1;
    this.sessionID = '';
  }

  async getStarted(url) {
    try {
      const res = await fetch(`${this._apiBase + url + this._apiKey + `&page=${this.page}`}`);

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
      const res = await fetch(`${this._apiBase + url + this._apiKey + `&query=${query}` + `&page=${this.page}`}`);

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
    const res = await this.getStarted('movie/popular/');
    return res;
  }

  async searchMovies(query) {
    const res = await this.getResourse('search/movie', query);
    return res;
  }

  async getGenres() {
    const url = `https://api.themoviedb.org/3/genre/movie/list${this._apiKey}`;
    try {
      const data = await fetch(url);
      if (!data.ok) {
        throw new Error('NO RESPONSE!');
      }
      return await data.json();
    } catch (error) {
      throw new Error(error);
    }
  }

  async postRatedMovies(id, stars) {
    const path = `/movie/${id}/rating${this._apiKey}`;
    const url = `${this._apiBase}${path}&guest_session_id=${this.sessionID}`;

    try {
      const data = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          value: stars,
        }),
      });
      if (!data.ok) {
        throw new Error('NO success!');
      }
      return data.json();
    } catch (err) {
      throw new Error(err);
    }
  }

  async getRatedMovies(page) {
    this.sessionID = localStorage.getItem('guest_session_id');

    const url = `guest_session/${this.sessionID}/rated/movies${this._apiKey}&page=${page}`;
    const res = await fetch(`${this._apiBase + url + this._apiKey + `&page=${page}`}`);

    if (!res.ok) {
      throw new Error(`Could't fetch ${url}` + `, received ${res.status}`);
    }

    return await res.json();
  }

  async createSessionID() {
    const sessionIDParams = `authentication/guest_session/new${this._apiKey}`;
    try {
      if (localStorage['guest_session_id']) {
        return (this.sessionID = localStorage.getItem('guest_session_id'));
      }
      const res = await fetch(this._apiBase + sessionIDParams);
      const data = await res.json();
      this.sessionID = data.guest_session_id;
      localStorage.setItem('guest_session_id', this.sessionID);
      return this.sessionID;
    } catch (err) {
      throw new Error(err);
    }
  }
}
