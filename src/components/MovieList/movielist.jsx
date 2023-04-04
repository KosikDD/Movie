import React, { Component } from 'react';
import { Alert, Space } from 'antd';

import './movielist.css';
import MovieItem from '../MovieItem';

export default class MovieList extends Component {
  render() {
    const { movies, loading, error, errortype, onrate, ratedmovies } = this.props;
    const ratedids = ratedmovies.map((item) => {
      return item.id;
    });
    if (error) {
      if (errortype === 'Error') {
        return (
          <Space direction="vertical" style={{ width: '100%' }}>
            <Alert
              message="Ничего не найдено("
              description="По Вашему запросу ничего не удалочь найти... Попробуйте ввести другой запрос"
              type="warning"
            />
          </Space>
        );
      } else {
        return (
          <Space direction="vertical" style={{ width: '100%' }}>
            <Alert
              message="Невозможно подгрузить данные..."
              description="Для работы с сервисов необходимо включить VPN, или проверьте Ваше интернет соединение!"
              type="error"
            />
          </Space>
        );
      }
    } else {
      return (
        <ul className="movie-list">
          {movies.map((item) => {
            const { id } = item;
            if (ratedids.includes(id)) {
              return (
                <MovieItem
                  movies={item}
                  key={id}
                  rating={ratedmovies[ratedids.indexOf(id)].rating}
                  loading={loading}
                  rateMovie={(star) => {
                    onrate(id, star);
                  }}
                />
              );
            } else {
              return (
                <MovieItem
                  movies={item}
                  key={id}
                  loading={loading}
                  rateMovie={(star) => {
                    onrate(id, star);
                  }}
                />
              );
            }
          })}
        </ul>
      );
    }
  }
}
