import React from 'react';
import Header from './header';
import './layout.css';
import BottomNavigation from './bottomNavigation';

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => (
  <>
    <Header />
    <div
      style={{
        margin: '1rem auto 0',
        maxWidth: 960,
        padding: '0 1.0875rem 1.45rem',
      }}
    >
      <main>{children}</main>
      <footer>
        Made with
        {' '}
        <span role="img" aria-labelledby="love">❤️</span>
        {' '}
        by
        {' '}
        <a href="https://twitter.com/rickkln">@rickkln</a>
        <br />
        <a href="https://github.com/rickkln/corona">View Source</a>
      </footer>
    </div>
    <BottomNavigation />
    <script src="/__/firebase/7.14.0/firebase-app.js" />
    <script src="/__/firebase/init.js" />
  </>
);

export default Layout;
