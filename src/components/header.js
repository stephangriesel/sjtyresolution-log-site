import React, {useContext} from "react"
import PropTypes from "prop-types"
import { Link, navigate } from "gatsby"
import logo from '../images/logo.png'
import { FirebaseContext } from "./Firebase"

import styled from "styled-components"

const Header = ({ siteTitle }) => {
  const {firebase, user} = useContext(FirebaseContext);
  console.log("Firebase Context Data: ", firebase, user)

  function handleLogoutClick(){
    firebase.logout().then(() => navigate('/login'))
  }
  return(
  <header
    style={{
      background: `white`,
      marginBottom: `1.45rem`,
      boxShadow: `0 8px 12px -6px grey`
    }}
  >
    <div
      className="logo"
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <div>
        <a href="/"><img 
        src={logo} 
        style={{
          height:`5em`, 
          margin: `0 auto`
        }} 
        alt="logo" 
        /></a></div>
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `grey`,
            textDecoration: `none`,
            margin: `0 0 0 2em`,
            fontFamily: `arial`
          }}
        >
          {/* {siteTitle} */}
        </Link>
      </h1>
      <div>
        {!!user && !!user.email &&
        <div>
          Hi, {user.email}
          <div>
            <LogOutLink onClick={handleLogoutClick}>
              Logout
            </LogOutLink>
          </div>
        </div>
        }
        {(!user || !user.email) && 
          <div style={{fontFamily:`arial`}}>
            <Link to="/login">
              Login
            </Link>
            <Divider />
            <Link to="/register">
              Register
            </Link>
          </div>
        }
      </div>
    </div>
  </header>
  )}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

const LogOutLink = styled.span`
&:hover {
  text-decoration:underline;
  cursor:pointer;
}
`

const Divider = styled.span`
margin: 0 8px;
padding-right:1px;
background:#DDDDDD;
`

export default Header
