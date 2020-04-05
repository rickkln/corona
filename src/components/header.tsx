import React, { CSSProperties } from 'react';
import { Link } from 'gatsby';
import Logo from './logo';

const linkStyle: CSSProperties = {
  textDecoration: 'none',
  margin: '0 0.8rem',
};

const activeStyle: CSSProperties = {
  textDecoration: 'underline',
};

const Header = () => (
  <header
    style={{
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 760,
        padding: '1.4rem 1.0875rem 1rem',
        display: 'flex',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
      }}
    >
      <div
        style={{
          flex: '1',
        }}
      >
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div
        style={{
          flex: '2.3',
          display: 'flex',
          // justifyContent: 'right',
          // alignItems: 'center',
        }}
      >
        <h1
          style={{
            marginBottom: '1rem',
            textAlign: 'center',
          }}
        >
          <Link to="/" style={linkStyle} activeStyle={activeStyle}>Latest</Link>
          <Link to="/about" style={linkStyle} activeStyle={activeStyle}>About</Link>
        </h1>
      </div>
    </div>
  </header>
);

export default Header;
