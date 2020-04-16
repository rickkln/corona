import React from 'react';
import { OutbreakStatus, getCSSClassFor } from '../utilities/getData';
import styles from './legend.module.css';

const Legend = () => (
  <div className={styles.legend}>
    <h3>Legend</h3>
    <p>The items below all refer to a given 5 day period, unless otherwise stated.</p>
    <ul>
      <li className={styles.none}>
        <strong>
          {OutbreakStatus.None}
          :
          {' '}
        </strong>
        There have been
        {' '}
        <strong>no deaths</strong>
        .
      </li>
      <li className={styles.small}>
        <strong>
          {OutbreakStatus.Small}
          :
          {' '}
        </strong>
        There have been
        {' '}
        <strong>less than 10 deaths</strong>
        .
      </li>
      <li className={styles.losing}>
        <strong>
          {OutbreakStatus.Losing}
          :
          {' '}
        </strong>
        Deaths rose by
        {' '}
        <strong>100% or more</strong>
        {' '}
        (Deaths are doubling, or worse, every 5 days).
      </li>
      <li className={styles.flattening}>
        <strong>
          {OutbreakStatus.Flattening}
          :
          {' '}
        </strong>
        Deaths did not double, but did
        {' '}
        <strong>increase</strong>
        {' '}
        OR
        {' '}
        <strong>stay above 100</strong>
        .
      </li>
      <li className={styles.crushing}>
        <strong>
          {OutbreakStatus.Crushing}
          :
          {' '}
        </strong>
        Deaths decreased
        {' '}
        <strong>by 50% or more</strong>
        {' '}
        OR
        {' '}
        <strong>to below 100</strong>
        .
      </li>
      <li className={styles.winning}>
        <strong>
          {OutbreakStatus.Winning}
          :
          {' '}
        </strong>
        New deaths decreased to
        {' '}
        <strong>below 10</strong>
        .
      </li>
      <li className={styles.won}>
        <strong>
          {OutbreakStatus.Won}
          :
          {' '}
        </strong>
        We have had
        {' '}
        <strong>no new deaths</strong>
        {' '}
        for 10 days.
      </li>
    </ul>
  </div>
);

export default Legend;
