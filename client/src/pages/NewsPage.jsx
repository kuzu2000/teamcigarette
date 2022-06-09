import React, { useEffect, Suspense } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNews } from './../redux/newsSlice';
import { Link } from 'react-router-dom';
import Moment from 'moment';
import { CircularProgress } from '@mui/material';
const Sponsors = React.lazy(() => import('../components/Sponsors/Sponsors'))
const Container = styled.div`
  font-family: monospace;
  color: rgb(248, 248, 248);
  background: rgb(0, 0, 0);
  position: relative;
  max-width: 100vw;
`;

const AddNewsButton = styled.button`
  position: absolute;
  right: 200px;
  border: none;
  background: none;
  background-color: white;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.4s cubic-bezier(0.455, 0.03, 0.515, 0.955);
  font-size: 0.85rem;
  font-weight: 600;

  &:hover {
    filter: brightness(70%);
  }
`;

const NewsHeader = styled.h1`
  font-size: 3rem;
  padding: 3rem;
  text-align: center;
  font-family: Barlow Condensed, sans-serif;

  @media only screen and (max-width: 380px) {
    font-size: 2.5rem;
    padding: 10px;
  }
`;

const NewsList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width:90%;
  margin: 0 auto;

  @media only screen and (max-width: 380px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin: 0;
    margin-left: -5px;
  }
`;

const Image = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  border-radius: 5px;
`;

const ArticleTitle = styled.div`
  position: absolute;
  bottom: 10px;
  left: 0px;
  font-size: 1.75rem;
  padding: 40px 20px;
  font-family: Barlow Condensed, sans-serif;
  text-transform: uppercase;
`;

const ArticleDate = styled.div`
  font-size: 12px;
  text-transform: uppercase;
  color: #888;
  position: absolute;
  bottom: -10px;
  left: 0px;
  padding: 40px 20px;
  font-family: Roboto, sans-serif;
  text-transform: uppercase;
`;

const ArticleTag = styled.div`
  position: absolute;
  top: 25px;
  left: 25px;
  font-size: 12px;
  padding: 8px 12px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 5px;
`;

const ReadMore = styled.div`
  position: absolute;
  font-size: 1rem;
  font-weight: 500;
  top: 220px;
  left: 80px;
  color: rgb(0, 0, 0);
  border-radius: 5px;
  padding: 8px 50px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  background-color: rgb(248, 248, 248);
  transition: all 0.2s ease-in-out;
  opacity: 0;
`;

const Article = styled.div`
  width: 340px;
  height: 440px;
  margin: 1rem 1.5rem;
  position: relative;
  cursor: pointer;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  cursor: pointer;

  &:hover ${Image} {
    filter: brightness(70%);
  }

  &:hover ${ArticleTitle} {
    filter: brightness(70%);
  }

  &:hover ${ArticleTag} {
    filter: brightness(70%);
  }

  &:hover ${ReadMore} {
    opacity: 1;
  }
`;

const NewsPage = () => {
  const user = useSelector((state) => state.user);
  const news = useSelector((state) => state.newsList.news);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  useEffect(() => {
    document.title = `News - Team Cigarette`;
  }, []);

  return (
    <>
      <Suspense fallback={<div><CircularProgress /></div>}>
      <Sponsors />
      
      <Container>
        {user.currentUser && user.currentUser?.result.isAdmin && (
          <AddNewsButton>
            <Link className="link" to="/news/create">
              + Add News
            </Link>
          </AddNewsButton>
        )}
        <NewsHeader>LATEST NEWS</NewsHeader>
        <NewsList>
          {Array.from(news).map((n) => (
            <Link key={n._id} className="link" to={`/news/${n._id}`}>
              <Article>
                <Image
                  style={{
                    backgroundImage: `url(${n.image})`,
                  }}
                ></Image>
                <ArticleTitle>{n.title}</ArticleTitle>
                <ArticleDate>
                  {Moment(n.createdAt).format('MMMM DD, YYYY')}
                </ArticleDate>
                <ArticleTag>{n.category}</ArticleTag>
                <ReadMore>READ MORE</ReadMore>
              </Article>
            </Link>
          ))}
        </NewsList>
      </Container>
      </Suspense>
    </>
  );
};

export default NewsPage;
