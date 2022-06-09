import React, { useState, useEffect } from 'react';
import './style.css'
import {useSelector, useDispatch} from 'react-redux'
import {fetchNews} from './../../redux/newsSlice'
import {Link} from 'react-router-dom'

const Header = () => {
  const [index, setIndex] = useState(0);
  const news = useSelector(state => state.newsList.news)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchNews())
  }, [dispatch])

  useEffect(() => {
    const lastIndex = news.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, news]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);
  

  return (
    <div className="section-center">
        {Array.from(news).map((n, newsIndex) => {
          const { _id, image, title } = n;

          let position = 'nextSlide';
          if (newsIndex === index) {
            position = 'activeSlide';
          }
          if (
            newsIndex === index - 1 ||
            (index === 0 && newsIndex === news.length - 1)
          ) {
            position = 'lastSlide';
          }

          return (
            <Link className="link" key={_id} to={`/news/${_id}`}>
            <article className={position}>
              <img src={image} alt={title} className="news-img" />
              <h4>{title}</h4>
              <p>Read More</p>
            </article>
            </Link>
          );
        })}
      </div>
  );
};

export default Header;
