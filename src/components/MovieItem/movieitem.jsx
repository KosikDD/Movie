import React, { Component, useState, useContext } from 'react';
import { Rate, Spin } from 'antd';
import classNames from 'classnames';

import './movieitem.css';
import { GenresContext } from '../Context';
export default class MovieItem extends Component {
  constructor(props) {
    super(props);
    this.state = { rating: this.props.rating };
  }

  render() {
    const { movies, loading, rateMovie } = this.props;
    const spinner = loading ? <Spin size="large" /> : null;

    const content = !loading ? (
      <ItemView movies={movies} rateMovie={rateMovie} rating={this.state.rating}></ItemView>
    ) : null;

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

const ItemView = ({ movies, rateMovie, rating }) => {
  const { title, release_date, overview, poster_path, genre_ids, vote_average } = movies;
  const ratingColor = classNames({
    bad: vote_average < 3,
    ok: vote_average >= 3 && vote_average < 5,
    good: vote_average >= 5 && vote_average < 7,
    awesome: vote_average >= 7,
  });
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const [imgLoad, setImgLoad] = useState(false);
  const { genres } = useContext(GenresContext);
  const _poster_path_api = '//image.tmdb.org/t/p/w500/';
  let path = '';

  if (poster_path === null) {
    path = '//dom-dekor.ru/images/not-photo.png.webp';
  } else {
    path = _poster_path_api + poster_path;
  }

  if (!imgLoad) {
    let image = new Image();
    image.src = path;
    image.onload = () => {
      setImgLoad(true);
    };
  }

  const showImg = imgLoad ? <img className="card-img" src={path} alt="poster" loading="lazy" /> : <Spin size="large" />;

  const date = new Date(release_date);

  const onRate = (star) => {
    console.log(star);
    rateMovie(star);
  };

  return (
    <React.Fragment>
      <div className="card-image">{showImg}</div>
      <div className="card-info">
        <div className="card-rating">
          <div className={classNames(ratingColor)}>
            <span>{vote_average.toFixed(1)}</span>
          </div>
        </div>
        <label className="label">{title}</label>
        <span className="release-date">{date.toLocaleString('en-US', options)}</span>
        <ul className="genres-list">
          {genre_ids?.map((el) => {
            let tagName = genres.find((item) => {
              if (item.id === el) {
                return item;
              }
            });
            return (
              <li className="genres-item" key={el}>
                {tagName.name}
              </li>
            );
          })}
        </ul>
        <span className="overview">{overview}</span>
        <Rate allowHalf defaultValue={rating} count={10} onChange={(value) => onRate(value)} />
      </div>
    </React.Fragment>
  );
};
