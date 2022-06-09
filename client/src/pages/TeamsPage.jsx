import React, { useEffect, Suspense } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTeams } from './../redux/teamSlice'
import {Link} from 'react-router-dom'
import { CircularProgress } from '@mui/material';
const Sponsors = React.lazy(() => import('../components/Sponsors/Sponsors'))

const TeamsContainer = styled.div`
  width: 100%;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TeamHeader = styled.h1`
  font-family: Barlow Condensed, sans-serif;
  padding-top: 3rem;
  width: 100%;
  font-size: 3rem;
  text-align: center;
  background-color: rgb(0, 0, 0);
  color: rgb(248, 248, 248);

  @media only screen and (max-width: 420px) {
    margin-bottom: 40px;
  }
`;

const TeamLists = styled.div`
display: flex;
align-items: center;
width: 100%;
flex-wrap: wrap;
justify-content: space-around;
`;

const TeamList = styled.div`
width: 400px;
  height: 200px;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  &:hover {
    filter: brightness(70%);
  }

  @media only screen and (max-width: 420px) {
    width: 200px;
    height: 150px;
  }
`;

const TeamsPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);
  const teams = useSelector((state) => state.team.teams);
  return (
      <div style={{backgroundColor: "#000"}}>

          <Suspense fallback={<div><CircularProgress /></div>}>
      <Sponsors />
      </Suspense>
      
    <TeamsContainer>
      <TeamHeader>OUR TEAMS</TeamHeader>
      <TeamLists>
        {Array.from(teams).map((team) => (
          <Link key={team._id} className="link" to={`/teams/${team._id}`}>
          <TeamList
            key={team._id}
            style={{ backgroundImage: `url(${team.teamLogo})` }}
          ></TeamList>
          </Link>
        ))}
      </TeamLists>
    </TeamsContainer>
    </div>
  );
};

export default TeamsPage;
