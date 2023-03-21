export default class TheMoviedb {
  _apiBase = 'https://api.themoviedb.org/3/';
  _apiKey = '?api_key=616954cad9058194dbece5c19cab957a';

  async getResourse(url) {
    const res = await fetch(`${this._apiBase + url + this._apiKey + '&page=1'}`);

    if (!res.ok) {
      throw new Error(`Could't fetch ${url}` + `, received ${res.status}`);
    }

    return await res.json();
  }

  async getPopularMovies() {
    const res = await this.getResourse('movie/popular/');
    return res.results;
  }
}
