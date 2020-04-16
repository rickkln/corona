import React, { CSSProperties } from 'react';
import { Link } from 'gatsby';
import styles from './header.module.css';
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
        maxWidth: 960,
        padding: '1.4rem 1.0875rem 0',
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
        className={styles.title}
        style={{
          flex: '3.5',
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: 'none',
          }}
        >
          <h3
            style={{
              margin: '0',
              verticalAlign: 'center',
            }}
          >
            Coronavirus
            <br />
            Pandemic Status
          </h3>
        </Link>
      </div>
      <div
        style={{
          flex: '6',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <div>
          <h1
            style={{
              margin: '0',
            }}
          >
            <Link to="/" style={linkStyle} activeStyle={activeStyle}>Latest</Link>
            <Link to="/data" style={linkStyle} activeStyle={activeStyle}>Data</Link>
            <Link to="/details" style={linkStyle} activeStyle={activeStyle}>Details</Link>
            <Link to="/about" style={linkStyle} activeStyle={activeStyle}>About</Link>
          </h1>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
