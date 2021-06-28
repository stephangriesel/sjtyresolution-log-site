import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import logo from '../images/logo.png'

const Header = ({ siteTitle }) => (
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
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
