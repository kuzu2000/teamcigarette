import React, {useEffect, Suspense} from 'react';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux'
import { useLocation } from 'react-router-dom';
import { getNewsDetail } from '../redux/api';
import Moment from 'moment';
import { CircularProgress } from '@mui/material';
const Sponsors = React.lazy(() => import('../components/Sponsors/Sponsors'))
const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: white;
  min-height: 100vh;
width: 100%;

  margin: 0 auto;
  font-family: monospace;
  background-color: black;
`;

const NewsContainer = styled.div`
    display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  width: 80%;

  @media only screen and (max-width: 420px) {
    width: 100%;
  }
`

const Image = styled.div`
  width: 100%;
  height: 360px;
  border-radius: 10px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media only screen and (max-width: 420px) {
    background-position: center center;
  }
`;
const NewsTitle = styled.div`
margin-top: 15px;
  font-size: 3rem;
  text-shadow: 2px 2px 2px #656565;
  text-align:center;
  text-transform: uppercase;

   @media only screen and (max-width: 420px) {
    font-size: 1.5rem;
  }
`;

const NewsDate = styled.div`
  margin-top: 10px;
  font-size: 1.5rem;
  text-shadow: 2px 2px 2px #656565;
  font-weight: bold;
  color: #b3b3b3;
  @media only screen and (max-width: 420px) {
    font-size: 1rem;
  }
`;

const NewsDescription = styled.div`
  margin-top: 15px;
  background-color: rgb(17, 17, 17);
  padding: 30px 15px;
  border-radius: 10px;
  font-size: 1.25rem;
  text-align: center;
  font-family: Roboto,sans-serif;
  @media only screen and (max-width: 420px) {
    line-height: 175%;
    letter-spacing: 1px;
    font-size: 0.85rem;
  }
`;
 
const NewsDetail = () => {
  const dispatch = useDispatch()
  const {pathname} = useLocation()
  const newsId = pathname.replace("/news/", "")

  const news = useSelector(state => state.newsList.news)
  const Loading = useSelector(state => state.newsList.isFetching)
  useEffect(() => {
    getNewsDetail(dispatch, newsId)
  }, [dispatch, newsId])

  useEffect(() => {
    if(Loading) {
      document.title = `Loading...`
    } else {
      document.title = `${news.title} - Team Cigarette`
    }
  }, [news.title, Loading]);

  return (
    <>
      <Suspense fallback={<div><CircularProgress /></div>}>
      <Sponsors />
      </Suspense>

      <Container>
          <NewsContainer>
        <Image
          style={{
            backgroundImage: `url(${news.image})`,
          }}
        ></Image>

        <NewsTitle>{news.title}</NewsTitle>
        <NewsDate>{Moment(news.createdAt).format("MMMM DD, YYYY")}</NewsDate>

        <NewsDescription>
          {news.description}
        </NewsDescription>
        </NewsContainer>
      </Container>
    </>
  );
};

export default NewsDetail;
