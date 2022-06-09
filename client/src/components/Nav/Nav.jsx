import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import logo from './official_logo-removebg-preview.png';
import { logout } from '../../redux/userSlice';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { mobile } from './../../responsive';
const NAV = styled.nav`
  height: 80px;
  background-color: rgb(17, 17, 17);
  color: rgb(248, 248, 248);
  text-transform: uppercase;
  font-family: sans-serif;
  position: relative;
`;

const Navbar = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: '10px 0px' })}
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s;
  color: rgb(217, 217, 217);
  max-width: 300px;
  max-height: 84px;
`;

const Logo = styled.img`
  max-width: 68%;
  max-height: 68%;
  background-size: cover;
  background-position: center center;
  ${mobile({ maxWidth: 200, Height: 80 })}
`;

const Lists = styled.div`
  font-size: 1rem;
  font-weight: 600;
`;

const UnorderedList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 420px) {
    display: none;
  }
`;

const List = styled.li`
  font-size: 14px;
  list-style: none;
  margin: 1rem;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    color: rgb(217, 217, 217);
  }
`;

const ResponsiveList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  display: none;

  @media only screen and (max-width: 420px) {
    display: block;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const RList = styled.li`
  font-size: 1.5rem;
  list-style: none;
  margin: 0.8rem;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    color: rgb(217, 217, 217);
  }
`;

const DropDown = styled.div`
  position: absolute;
  top: 80px;
  margin: 0;
  right: 170px;
  padding: 0;
  width: 200px;
  background-color: #000;
  z-index: 9999;
  transition: all 0.2s ease-in-out;
  transform: scaleY(0);

  ${({ open }) =>
    open &&
    `
    transform: scaleY(1);
  `}
`;

const UL = styled.ul`
  list-style: none;
`;

const LI = styled.li`
  font-family: sans-serif;
  margin: 0 !important;
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  height: auto;
  text-align: right;
  border-bottom: 1px solid;
  border-color: #333;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    color: rgb(217, 217, 217);
  }
`;

const DropDownAccount = styled.div`
  position: absolute;
  top: 80px;
  margin: 0;
  right: 50px;
  padding: 0;
  width: 200px;
  background-color: #000;
  z-index: 9999;
  transition: all 0.2s ease-in-out;
  transform: scaleY(0);

  ${({ aOpen }) =>
    aOpen &&
    `
    transform: scaleY(1);
  `}
`;

const SideBar = styled.div`
  display: none;
  @media only screen and (max-width: 420px) {
    display: block;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0px;
    margin: 0;
    padding: 0;
    left: -100%;
    overflow-y: scroll;
    background-color: #202020;
    z-index: 9999;
    transition: all 0.3s ease-in-out;
    font-family: Roboto, sans-serif;

    ${({ navOpen }) => navOpen && `left: 0%;`}
  }
`;

const Close = styled.div`
  display: block;
  font-size: 10px;
  text-transform: uppercase;
  color: #9b9b9b;
  text-align: right;
  margin: 10px 10px 10px 0;
  cursor: pointer;
`;

const SideBarLists = styled.ul`
  @media only screen and (max-width: 420px) {
    list-style-type: none;
    margin: 0;
    padding: 0 10px;
  }
`;

const SideBarList = styled.li`
  @media only screen and (max-width: 420px) {
    width: 100%;
    margin: 0;
    padding: 12px 0;
    cursor: pointer;

    &:hover {
      color: #9b9b9b;
    }
  }
`;

const ULAccount = styled.ul`
  display: block;
  list-style: none;
  @media only screen and (max-width: 420px) {
    display: block;
  }
`;

const TeamLists = styled.ul`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  list-style: none;
  display: none;

  ${({ teamOpen }) => teamOpen && `display: block;`}
  ${({ accounttOpen }) => accounttOpen && `display: block;`}
`;

const TeamList = styled.li`
  margin-bottom: 10px;
  transition: 0.4s;
  &:hover {
    color: #9f9f9f;
  }
`;

const Nav = () => {
  const [accounttOpen, setAccounttOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [teamOpen, setTeamOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [aOpen, setAOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const { currentUser } = user;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Logout = () => {
    dispatch(logout());
    navigate('/login');
    setNavOpen(false);
  };

  return (
    <NAV>
      <Navbar>
        <Title>
          <Link className="link" to="/">
            <Logo src={logo} alt="Team Cigarette" />
          </Link>
        </Title>
        <Lists>
          <UnorderedList>
            {currentUser && currentUser?.result.isAdmin && (
              <List>
                <Link className="link" to="/admin">
                  Admin
                </Link>
              </List>
            )}
            <List>
              <Link className="link" to="/products">
                Shop
              </Link>
            </List>
            <List>
              <Link className="link" to="/news">
                News
              </Link>
            </List>
            <List
              style={{
                height: '80px',
                display: 'flex',
                width: '80px',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <Link className="link" to="/teams">
                Team <i className="fa fa-caret-down"></i>
              </Link>
            </List>
            <List>
            <Link className="link" to="/about">
                About
              </Link>
            </List>
            {currentUser ? (
              <List
                style={{
                  height: '80px',
                  display: 'flex',
                  width: '40px',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onMouseEnter={() => setAOpen(true)}
                onMouseLeave={() => setAOpen(false)}
              >
                <i className="fa fa-user"></i>
              </List>
            ) : (
              <List
                style={{
                  height: '80px',
                  display: 'flex',
                  width: '40px',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Link className="link" to="/login">
                  <i className="fa fa-user"></i>
                </Link>
              </List>
            )}
            <List>
              <Link className="link" to="/cart">
                <ShoppingBagIcon sx={{fontSize: '1rem'}}/>
              </Link>
            </List>
          </UnorderedList>
          <ResponsiveList>
            <RList>
              <i className="fa fa-bars" onClick={() => setNavOpen(true)}></i>
            </RList>
            <RList>
              <Link className="link" to="/cart">
              <ShoppingBagIcon/>
              </Link>
            </RList>
          </ResponsiveList>
        </Lists>
      </Navbar>
      <DropDown
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        open={open}
      >
        <UL>
          <LI>
            <Link to={`/teams/629931892424cfc43f6ba316`} className="link">
              Dota 2
            </Link>
          </LI>
          <LI>
            <Link to={`/teams/629938d5ee9a02ee399cb6ca`} className="link">
              PUBG-M
            </Link>
          </LI>
        </UL>
      </DropDown>
      <DropDownAccount
        onMouseEnter={() => setAOpen(true)}
        onMouseLeave={() => setAOpen(false)}
        aOpen={aOpen}
      >
        <ULAccount>
          <LI>
            <Link to="/history" className="link">
              Order History
            </Link>
          </LI>
          <LI>
            <Link to="/account" className="link">
              Account Settings
            </Link>
          </LI>
          <LI onClick={Logout}>Log out</LI>
        </ULAccount>
      </DropDownAccount>
      <SideBar navOpen={navOpen}>
        <Close onClick={() => setNavOpen(false)}>
          <i className="fa fa-times"> CLOSE</i>
        </Close>
        <SideBarLists>
          <SideBarList>
            <Link
              to="/products"
              className="link"
              onClick={() => setNavOpen(false)}
            >
              SHOP
            </Link>
          </SideBarList>
          <SideBarList>
            <Link to="/news" className="link" onClick={() => setNavOpen(false)}>
              NEWS
            </Link>
          </SideBarList>
          <SideBarList onClick={() => setTeamOpen(!teamOpen)}>
            <p style={{ display: 'flex', justifyContent: 'space-between' }}>
              TEAMS
              <i className="fa fa-plus"></i>
            </p>
            <TeamLists teamOpen={teamOpen}>
              <TeamList>
                <Link
                  to="/teams"
                  className="link"
                  onClick={() => setNavOpen(false)}
                >
                  ALL
                </Link>
              </TeamList>
              <TeamList>
                <Link
                  to={`/teams/629931892424cfc43f6ba316`}
                  className="link"
                  onClick={() => setNavOpen(false)}
                >
                  DOTA 2
                </Link>
              </TeamList>
              <TeamList>
                <Link
                  to={`/teams/629938d5ee9a02ee399cb6ca`}
                  className="link"
                  onClick={() => setNavOpen(false)}
                >
                  PUBG-M
                </Link>
              </TeamList>
            </TeamLists>
          </SideBarList>

          <SideBarList onClick={() => setNavOpen(false)}>
            <Link to="/about" className="link">
              ABOUT
            </Link>
          </SideBarList>
          {currentUser && currentUser?.result.username ? (
            <SideBarList onClick={() => setAccounttOpen(!accounttOpen)}>
              <p style={{ display: 'flex', justifyContent: 'space-between' }}>
                ACCOUNT
                <i className="fa fa-plus"></i>
              </p>
              <TeamLists accounttOpen={accounttOpen}>
                <TeamList onClick={() => setNavOpen(false)}>
                  <Link to="/history" className="link">
                    ORDER HISTORY
                  </Link>
                </TeamList>
                <TeamList onClick={() => setNavOpen(false)}>
                  <Link to="/account" className="link">
                    ACCOUNT SETTINGS
                  </Link>
                </TeamList>
              </TeamLists>
            </SideBarList>
          ) : (
            <SideBarList>
              <Link
                to="/login"
                className="link"
                onClick={() => setNavOpen(false)}
              >
                LOGIN
              </Link>
            </SideBarList>
          )}
          {currentUser && <SideBarList onClick={Logout}>LOG OUT</SideBarList>}
        </SideBarLists>
      </SideBar>
    </NAV>
  );
};

export default Nav;
