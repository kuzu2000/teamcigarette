import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getTeamDetails } from './../../redux/api';
const Container = styled.div`
  background-color: rgb(0, 0, 0);
`;

const PlayerContainer = styled.div`
  position: fixed;
  top: 0;
  right: -100%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  z-index: 9999;
  transition: all 0.2s ease-in-out;
`;

const PlayerBlock = styled.div`
  position: relative;
  margin: 0;
  padding: 20px;
  box-sizing: border-box;
  width: 40%;
  background-color: #111;
  border-radius: 10px;

  @media only screen and (max-width: 420px) {
    width: 95%;
  }
`;

const CloseProfileButton = styled.span`
  position: absolute;
  top: 20px;
  right: 20px;
  margin: 0;
  padding: 0;
  font-size: 32px;
  color: #fff;
`;

const BioPlayerHeader = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 20px;
  padding: 0;
  width: 100%;
`;

const BioPlayerImage = styled.div`
  float: left;
  margin: 0;
  padding: 0;
  width: 30%;
`;

const BioImage = styled.img`
  margin: 0;
  padding: 0;
  max-width: 100%;
  max-height: 200px;
`;

const BioPlayerHeading = styled.div`
  float: left;
  margin: 0;
  padding: 0 0 0 20px;
  box-sizing: border-box;
  width: 70%;
`;

const BioPlayerHeading3 = styled.h3`
  font-size: 32px;
  color: #fff;
  text-transform: uppercase;
  margin: 0 0 20px;
  padding: 0;
  font-family: Barlow Condensed, sans-serif;
`;

const BioPlayerPara = styled.p`
  color: #fff;
  text-transform: uppercase;
  font-family: Roboto, sans-serif;
`;

const BioPlayerDescription = styled.div`
  margin: 0 0 20px;
  padding: 0;
  width: 100%;
`;

const BioPlayerDescriptionPara = styled.p`
  font-size: 14px;
  color: #fff;
  margin: 0;
  padding: 0;
  line-height: 150%;
  letter-spacing: 1px;
  font-family: Roboto,sans-serif;
`;

const BioPlayerDetails = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  font-family: Roboto,sans-serif;
`;
const DetailsBlock = styled.div`
  float: left;
  margin: 0 20px 0 0;
  padding: 0;
`;

const DetailsBlockSpan = styled.span`
  display: inline-block;
  font-size: 12px;
  text-transform: uppercase;
  color: #b3b3b3;
  margin: 0 0 10px;
  padding: 0;
`;

const DetailsBlockPara = styled.p`
  font-size: 16px;
  text-transform: uppercase;
  color: #fff;
  margin: 0;
  padding: 0;
`;

const PlayerTwitter = styled.a`
  font-size: 16px;
  font-family: Barlow Condensed, sans-serif;
  font-weight: 500;
  color: #2bc4ff;
`;

const PlayerExternal = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  color: #fff;
  margin: 15px;
`;

const PlayerAnchor = styled.a`
  text-decoration: none;
  color: #80bceb;

  &:hover {
    cursor: pointer;
  }
`;

const TeamPageContainer = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  min-height: 100vh;
  clear: both;
  width: 100%;
`;

const TeamPageContent = styled.div`
  clear: both;
  margin: 0;
  padding: 0;
  width: 100%;
  position: relative;
`;

const ContentPosition = styled.div`
  margin: 0 auto;
  padding: 0;
  width: 100%;
  max-width: 1180px;
`;

const TeamPageList = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 0 0 80px;
  padding: 0;
  width: 100%;
  list-style-type: none;
  margin: 0;
  padding: 0;
  @media only screen and (max-width: 420px) {
    flex-direction: column;
  }
`;

const RosterBlock = styled.li`
  position: relative;
  float: left;
  margin: 0 0 40px;
  padding: 0;
  width: 32%;
  height: 500px;
  cursor: pointer;

  @media only screen and (max-width: 420px) {
    width: 90%;
    margin: 0 auto;
    margin-bottom: 40px;
    height: 450px
  }
  
`;

const RosterBlockBackground = styled.div`
  position: absolute;
  bottom: 0;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 90%;
  background-color: #111;
  border-radius: 5px;
`;
const RosterBlockImage = styled.div`
  position: absolute;
  top: 0;
  margin: 0;
  padding: 0;
  width: 100%;
  text-align: center;
  transition: transform 0.2s;
`;

const RosterBlockImg = styled.img`
  width: 80%;
  height: 300px;
  margin: 0;
  padding: 0;
  border-radius: 10px;
  box-shadow: 0 4px 8px #0003, 0 6px 20px #0003;
  transition: 0.2s ease-out;

  &:hover {
    width: 90%;
    height: 340px;
  }

  @media only screen and (max-width:420px) {
    height: 250px;

    &:hover {
      height: 280px;
    }
  }
`;

const RosterBlockInfo = styled.div`
  position: absolute;
  bottom: 40px;
  margin: 0;
  padding: 0;
  width: 100%;
  text-align: center;

   @media only screen and (max-width: 420px) {
    bottom: 60px;
  }
`;

const RosterBlockHeader = styled.h3`
  font-size: 32px;
  color: #fff;
  text-transform: uppercase;
  margin: 0 0 20px;
  padding: 0;
  font-family: Barlow Condensed,sans-serif;
`;

const RosterBlockPara = styled.p`
  font-size: 14px;
  color: #b3b3b3;
  text-transform: uppercase;
  margin: 0;
  padding: 0;
  font-family: sans-serif;
`;

const TeamPageHeader = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  height: 800px;
  @media only screen and (max-width: 420px) {

  }
`;

const TeamPageBackground = styled.div`
  position: absolute;
  margin: 0;
  padding: 0;
  background-size: cover;
  background-position: top left;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  -webkit-filter: greyscale(100%);
  filter: grayscale(100%);
`;

const TeamBackgroundOverlay = styled.div`
  position: absolute;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, black, transparent);
`;
const TeamLogoContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  text-align: center;
  width: 100%;
  height: calc(100% - 300px);

  
`;

const Img = styled.img`
@media only screen and (max-width: 380px) {
  max-height: 150px;
  max-width: 150px;
    margin: 0 0 20px;
    padding: 0;
}
`

const Players = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const teamId = pathname.replace('/teams/', '');

  useEffect(() => {
    getTeamDetails(dispatch, teamId);
  }, [dispatch, teamId]);

  const team = useSelector((state) => state.team.teams);
  const isFetching = useSelector(state => state.team.isFetching)

  useEffect(() => {
    if(isFetching) {
      document.title = `Loading...`
    } else {
      document.title = `Team Cigarette ${team.teamType}`
    }
  }, [team.teamType, isFetching]);

  function openProfile(profile) {
    document.getElementById(profile).style.right = '0';
    document.getElementById('teamPage').style.opacity = '0.5';
  }

  function closeProfile(profile) {
    document.getElementById(profile).style.right = '-100%';
    document.getElementById('teamPage').style.opacity = '1';
  }
  return (
    <Container id="shopify-section-team-one">
      {team?.players?.map((player) => (
        <PlayerContainer
          key={player.name}
          id={player.name}
          onClick={() => closeProfile(player.name)}
        >
          <PlayerBlock>
            <CloseProfileButton
              onClick={() => closeProfile(player.name)}
              aria-describedby="a11y-external-message"
            >
              <i className="fa fa-close" style={{ cursor: 'pointer' }}></i>
            </CloseProfileButton>

            <BioPlayerHeader>
              <BioPlayerImage>
                <BioImage src={player.image} alt={player.name} />
              </BioPlayerImage>
              <BioPlayerHeading>
                <BioPlayerHeading3>{player.name}</BioPlayerHeading3>
                <BioPlayerPara>{player.type}</BioPlayerPara>
              </BioPlayerHeading>
            </BioPlayerHeader>

            <BioPlayerDescription>
              <BioPlayerDescriptionPara>{player.desc}</BioPlayerDescriptionPara>
            </BioPlayerDescription>

            <BioPlayerDetails>
              <DetailsBlock>
                <DetailsBlockSpan>Current Team</DetailsBlockSpan>
                <DetailsBlockPara>{player.currentTeam}</DetailsBlockPara>
              </DetailsBlock>
              <DetailsBlock>
                <DetailsBlockSpan>Age</DetailsBlockSpan>

                <DetailsBlockPara>{player.age}</DetailsBlockPara>
              </DetailsBlock>
              <DetailsBlock>
                <DetailsBlockSpan>Country</DetailsBlockSpan>
                <DetailsBlockPara>{player.country}</DetailsBlockPara>
              </DetailsBlock>

              <DetailsBlock>
                <DetailsBlockSpan>Twitter</DetailsBlockSpan>
                <DetailsBlockPara>
                  <PlayerTwitter
                    href={player.twitterLink}
                    target="_new"
                    aria-describedby="a11y-external-message"
                  >
                    <i className="fa fa-twitter"></i> {player.twitterName}
                  </PlayerTwitter>
                </DetailsBlockPara>
              </DetailsBlock>
              <PlayerExternal>
                <PlayerAnchor href="#puppey" title="Player Profile Link">
                  <i className="fas fa-external-link-alt"></i>
                </PlayerAnchor>
              </PlayerExternal>
            </BioPlayerDetails>
          </PlayerBlock>
        </PlayerContainer>
      ))}

      <TeamPageHeader>
        <TeamPageBackground
          style={{ backgroundImage: `url(${team.backgroundCover})` }}
        ></TeamPageBackground>
        <TeamBackgroundOverlay></TeamBackgroundOverlay>
        <TeamLogoContainer>
          <Img
            style={{ maxHeight: '200px', margin: '0 0 20px' }}
            src={team.teamLogo}
            alt={team.teamType}
          />
        </TeamLogoContainer>
      </TeamPageHeader>

      <TeamPageContainer id="teamPage">
        <TeamPageContent>
          <ContentPosition>
            <TeamPageList>
              {team?.players?.map((player) => (
                <RosterBlock key={player.name}>
                  <span onClick={() => openProfile(player.name)}>
                    <RosterBlockBackground></RosterBlockBackground>
                    <RosterBlockImage>
                      <RosterBlockImg
                        id="img"
                        src={player.image}
                        alt={player.name}
                      />
                    </RosterBlockImage>
                    <RosterBlockInfo>
                      <RosterBlockHeader>{player.name}</RosterBlockHeader>
                      <RosterBlockPara>{player.type}</RosterBlockPara>
                    </RosterBlockInfo>
                  </span>
                </RosterBlock>
              ))}
            </TeamPageList>
          </ContentPosition>
        </TeamPageContent>
      </TeamPageContainer>
    </Container>
  );
};

export default Players;
