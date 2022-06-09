import React, { Suspense } from 'react';
import styled from 'styled-components';
import { CircularProgress } from '@mui/material';
import CEO from './gigachad.jpg';
const Sponsors = React.lazy(() => import('../components/Sponsors/Sponsors'));
const Container = styled.div`
  display: flex;
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
  margin: 40px auto;
  width: 80%;

  @media only screen and (max-width: 420px) {
    width: 100%;
  }
`;

const NewsTitle = styled.div`
  width: 60%;
  margin-top: 15px;
  font-size: 4rem;
  text-align: center;
  text-transform: uppercase;
  font-family: Barlow Condensed, sans-serif;

  @media only screen and (max-width: 420px) {
    font-size: 2.25rem;
    width: 90%;
  }
`;

const NewsAbout = styled.div`
  margin-top: 10px;
  font-size: 1.5rem;
  font-family: Roboto, sans-serif;
  font-weight: 700;
  color: #fff;
  background-color: rgb(17,17,17);
  padding: 10px 25px;
  border-radius: 5px;

  @media only screen and (max-width: 420px) {
    font-size: 0.75rem;
  }
`;

const NewsDescription = styled.div`
  margin-top: 15px;
  background-color: rgb(17, 17, 17);
  padding: 30px 15px;
  border-radius: 10px;
  font-size: 1.25rem;
  text-align: center;
  font-family: Roboto, sans-serif;
  @media only screen and (max-width: 420px) {
    line-height: 175%;
    font-size: 0.85rem;
    letter-spacing: 1px;
  }
`;

const CEOHeader = styled.div`
  margin-top: 40px;
  font-size: 3rem;
  text-align: center;
  text-transform: uppercase;
  font-family: Barlow Condensed, sans-serif;
  margin-bottom: 20px;

  @media only screen and (max-width: 420px) {
    font-size: 2.25rem;
  }
`;

const Card = styled.div`
display: flex;
align-items: center;
flex-direction: column;
padding: 20px 40px;
background-color: rgb(17,17,17);
border-radius: 5px;
`;

const CardImg = styled.img`
width: 120px;
border-radius: 50%;
object-fit: cover;
height: 120px;
`;

const CardName = styled.div`
margin-top: 10px;
  font-size: 1.5rem;
font-family: Barlow Condensed, sans-serif;
`;

const CardPosition = styled.div`
margin-top: 10px;
color: #888;
text-align: center;
font-size: 1rem;
font-family: Roboto, sans-serif;
`;

const About = () => {
  return (
    <>
      <Suspense
        fallback={
          <div>
            <CircularProgress />
          </div>
        }
      >
        <Sponsors />
      </Suspense>
      <Container>
        <NewsContainer>
          <NewsAbout>ABOUT US</NewsAbout>
          <NewsTitle>THE PEOPLE BEHIND THE CIGARETTE</NewsTitle>

          <NewsDescription>
            Team Cigarette® is a worldwide esports organization dedicated to
            bringing together the finest players, competing on the world's most
            prestigious stages, and providing the most exciting experience for
            our fans. We are dedicated to growing the esports community and
            follow a simple but effective philosophy: focus on developing the
            positive culture that is essential for team-based esports success.
            The Team Cigarette™ organization advances this ideology by offering
            esports players, both professional and aspiring, with advertising
            and promotional sponsorship, talent and team development, business
            management, coaching, and support.
          </NewsDescription>

          <CEOHeader>OUR CEO</CEOHeader>
          <Card>
            <CardImg src={CEO} alt="CEO"></CardImg>
            <CardName>SIGMA CHAD</CardName>
            <CardPosition>CHIEF EXECUTIVE OFFICER</CardPosition>
          </Card>
        </NewsContainer>
      </Container>
    </>
  );
};

export default About;
