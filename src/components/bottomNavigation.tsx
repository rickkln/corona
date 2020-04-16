import React, { CSSProperties } from 'react';
import { Link } from 'gatsby';
import { IoMdGlobe, IoIosInformationCircleOutline, IoMdSearch } from 'react-icons/io';
import { TiChartBarOutline } from 'react-icons/ti';
import styles from './bottomNavigation.module.css';

const activeStyle: CSSProperties = {
  fontWeight: 900,
  color: 'rgb(40, 197, 60)',
};

const BottomNavigation = () => (
  <div className={styles.nav}>
    <Link to="/" className={styles.linkStyle} activeStyle={activeStyle}>
      <IoMdGlobe />
      <div>Latest</div>
    </Link>
    <Link to="/data" className={styles.linkStyle} activeStyle={activeStyle}>
      <p>
        <TiChartBarOutline />
      </p>
      <p>Data</p>
    </Link>
    <Link to="/detail" className={styles.linkStyle} activeStyle={activeStyle}>
      <p><IoMdSearch /></p>
      <p>Details</p>
    </Link>
    <Link to="/about" className={styles.linkStyle} activeStyle={activeStyle}>
      <p><IoIosInformationCircleOutline /></p>
      <p>About</p>
    </Link>
  </div>
);

export default BottomNavigation;
