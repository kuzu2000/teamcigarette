import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTeams } from '../../redux/teamSlice';
import {Link} from 'react-router-dom'

const TeamsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TeamHeader = styled.h1`
  font-family: Barlow Condensed, sans-serif;
  padding-top: 3rem;
  width: 100%;
  text-align: center;
  background-color: rgb(0, 0, 0);
  color: rgb(248, 248, 248);

  @media only screen and (max-width: 420px) {
    margin-bottom: 25px;
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

const Teams = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);
  const teams = useSelector((state) => state.team.teams);
  return (
    <TeamsContainer>
      <TeamHeader>MEET OUR TEAMS</TeamHeader>
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
  );
};

export default Teams;
