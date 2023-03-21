import React, { Component } from 'react';
import { Rate, Spin } from 'antd';

import './movieitem.css';

export default class MovieItem extends Component {
  render() {
    const { Movies, loading } = this.props;

    const spinner = loading ? <Spin size="large" /> : null;
    const content = !loading ? <ItemView Movies={Movies}></ItemView> : null;

    return (
      <li>
        <div className="card">
          {spinner}
          {content}
        </div>
      </li>
    );
  }
}

const ItemView = ({ Movies }) => {
  const { title, release_date, overview, poster_path } = Movies;

  return (
    <React.Fragment>
      <img className="card-img" src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt="Постер фильма" />
      <div className="card-info">
        <label className="label">{title}</label>
        <span className="release-date">{release_date}</span>
        <ul className="genres-list">
          <li className="genres-item">Horor</li>
        </ul>
        <span className="overview">{overview}</span>
        <Rate allowHalf defaultValue={5} count={10} />
      </div>
    </React.Fragment>
  );
};
