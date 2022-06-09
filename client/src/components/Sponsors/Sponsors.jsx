import React from 'react';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import CheckroomRoundedIcon from '@mui/icons-material/CheckroomRounded';
import FeedIcon from '@mui/icons-material/Feed';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import styled from 'styled-components'

const SponsorsContainer = styled.div`
height: 60px;
  background-color: rgb(0, 0, 0);
  color: rgb(248, 248, 248);
  text-transform: uppercase;
  font-family: Roboto, sans-serif;
`

const SponsorsLists = styled.ul`
display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`

const SponsorsList = styled.li`
list-style: none;
  margin: 1rem;
`

const Sponsors = () => {
  return (
    <SponsorsContainer>
      <SponsorsLists>
        <SponsorsList><SportsEsportsIcon sx={{fontSize: '2.5rem'}}/></SponsorsList>
        <SponsorsList><CheckroomRoundedIcon sx={{fontSize: '2.5rem'}}/></SponsorsList>
        <SponsorsList><FeedIcon sx={{fontSize: '2.5rem'}}/></SponsorsList>
        <SponsorsList><AccessibilityNewIcon sx={{fontSize: '2.5rem'}}/></SponsorsList>
      </SponsorsLists>
    </SponsorsContainer>
  );
};

export default Sponsors;
