import axios from 'axios'
import Router from 'next/router'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import styled, { ThemeProvider, css, keyframes } from 'styled-components'

import portalSubTypeMaster from '../../constants/masters/portalSubTypeMaster.json'
import Menu from './menu'
import { useSelectorProps } from '../../props/useSelectorProps'

const AnimatedLogoContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const AnimatedLogoKeyframe = keyframes`
  0% {
    opacity:1;
    transform:  scaleX(1) scaleY(1);
  }
  50% {
    opacity:0.7;
    transform:  scaleX(1.2) scaleY(1.2);
  }
  100% {
    opacity:1;
    transform:  scaleX(1) scaleY(1);
  }
`

const AnimatedLogo = styled.img`
  display: block;
  width: 100px;
  height: 100px;
  animation: ${AnimatedLogoKeyframe} ease-in-out 2s infinite;
`

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr 40px;
  grid-template-columns: 230px 1fr;
`

const Sidebar = styled.div`
  position: fixed;
  width: 230px;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  grid-row: 1 / 3;
  grid-column: 1 / 2;
  background-color: #fff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.01);
  box-sizing: border-box;
`

const Content = styled.div`
  padding: 30px 50px;
  grid-row: 1 / 2;
  grid-column: 2 / 3;
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 50px;
  grid-row: 2 / 3;
  grid-column: 2 / 3;
  font-size: 0.875em;
  color: #92a3b9;
  > img {
    width: auto;
    height: 30px;
  }
`

const Logo = styled.img`
  display: block;
  margin: 10px auto;
  width: 100%;
  height: auto;
  box-sizing: border-box;
`

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0px 10px;
  font-size: 0.875em;
  padding: 20px 0px 10px 0px;
  height: 40px;
  border-top: 1px solid #f4f6f9;
`

const Profile = styled.div`
  flex-shrink: 0;
  margin-right: 15px;
  width: 50px;
  height: 50px;
  background-color: #e4ebf3;
  background-image: url('/profile.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border: 2px solid #dbe3ef;
  border-radius: 40px;
  box-sizing: border-box;
`

const ProfileName = styled.div`
  line-height: 1.1;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  > span {
    font-size: 0.8em;
    color: #92a3b9;
  }
  > span:nth-of-type(2) {
    font-size: 0.8em;
    color: #bac6d6;
  }
`

const Logout = styled.button`
  apperance: none;
  display: flex;
  align-items: center;
  margin: 10px 0px;
  padding: 0px 20px;
  height: 40px;
  color: #92a3b9;
  font-size: 1em;
  border-radius: 20px;
  background-color: transparent;
  border: none;
  outline: none;
  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.SIDEBAR_ACTIVE_COLOR};
    background-color: ${(props) => props.theme.SIDEBAR_ACTIVE_BACKGROUND};
  }
  > i {
    font-size: 20px;
    margin-right: 15px;
  }
`

const MainLayout = (props) => {
  const { isFetching, children } = props
  const dispatch = useDispatch()
  const theme = useSelector((state: useSelectorProps) => state.theme)
  const user = useSelector((state: useSelectorProps) => state.user)
  const handleOnClickLogout = () => {
    dispatch({ type: 'SET_THEME', payload: 'default' })
    dispatch({ type: 'SET_USER', payload: null })
    axios.get('/api/authen/logout')
    Router.push('/login')
  }
  if (isFetching) {
    return (
      <AnimatedLogoContainer>
        <AnimatedLogo
          src="/icon.png"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
        />
      </AnimatedLogoContainer>
    )
  } else {
    return (
      <Container className="container">
        <ThemeProvider theme={theme}>
          <Sidebar>
            <Logo
              src={user.partnerLogo ? user.partnerLogo : '/logo.png'}
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
            />
            <ProfileContainer>
              <Profile />
              <ProfileName>
                {user ? `${user.firstnameEN} ${user.lastnameEN}` : null}
                <br />
                <span>
                  {user ? portalSubTypeMaster[user.subType].label : null}
                </span>
                <br />
                <span>{user ? user.lastLogin : null}</span>
              </ProfileName>
            </ProfileContainer>
            <Menu user={user} theme={theme} />
            <Logout onClick={handleOnClickLogout}>
              <i className="fas fa-sign-out-alt" />
              Logout
            </Logout>
          </Sidebar>
          <Content>{children}</Content>
          <Footer>
            <span>© 2019 DIGIO (THAILAND) CO., LTD. ALL RIGHTS RESERVED</span>
            <img src="/logo.png" />
          </Footer>
        </ThemeProvider>
      </Container>
    )
  }
}

MainLayout.propTypes = {
  isFetching: PropTypes.bool,
  children: PropTypes.any
}

export default MainLayout
