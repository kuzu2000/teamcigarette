import React, {useEffect} from 'react';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux'
import {fetchNews} from './../../redux/newsSlice'
import {Link, useNavigate} from 'react-router-dom'
import Moment from 'moment';
const Container = styled.div`
  font-family: monospace;
  min-height: 100vh;
  color: rgb(248, 248, 248);
  background: rgb(0, 0, 0);
  position: relative;

  @media only screen and (max-width: 380px) {
    min-height: 100vh;
  }

`;

const NewsHeader = styled.h1`
  font-size: 4rem;
  padding: 3rem;
  text-align: center;
  font-family: Barlow Condensed,sans-serif;

  @media only screen and (max-width: 380px) {
    font-size: 2rem;
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
  font-size: 13px;
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
  font-size: 1rem;
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

const SeeMore = styled.div`
  margin: 30px auto 0;
  text-align: center;
  border-radius: 5px;
  padding: 18px 10px;
  width: 300px;
  font-size: 1.25rem;
  color: rgb(248, 248, 248);
  border: 1px solid rgb(248, 248, 248);
  transition: 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    color: rgb(0, 0, 0);
    background-color: rgb(248, 248, 248);
  }

  @media only screen and (max-width: 380px) {
    width: 200px;
    font-size: 1rem;
  }
`;

const News = () => {
  const news = useSelector(state => state.newsList.news)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchNews())
  }, [dispatch])

  const navigate = useNavigate()
  return (
    <Container>
      <NewsHeader>LATEST NEWS</NewsHeader>
      <NewsList>
        {Array.from(news).slice(0,6).map((n) => (
          <Link key={n._id} className="link" to={`/news/${n._id}`}>
          <Article>
          <Image style={{
          backgroundImage: `url(${n.image})`,
        }}></Image>
          <ArticleTitle>
            {n.title}
          </ArticleTitle>
          <ArticleDate>
                  {Moment(n.createdAt).format('MMMM DD, YYYY')}
                </ArticleDate>
          <ArticleTag>{n.category}</ArticleTag>
          <ReadMore>READ MORE</ReadMore>
        </Article>
        </Link>
        ))}
        

      </NewsList>
      <SeeMore onClick={() => navigate('/news')}>
        <h4>SEE MORE</h4>
      </SeeMore>
    </Container>
  );
};

export default News;
