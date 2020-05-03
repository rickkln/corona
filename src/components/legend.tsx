import React from 'react';
import { OutbreakStatus } from '../utilities/getData';
import styles from './legend.module.css';

export const getStatusInfo = (status: OutbreakStatus | undefined) => {
  if (status === OutbreakStatus.None) {
    return (
      <span>
        <strong>
          {OutbreakStatus.None}
          :
          {' '}
        </strong>
        There have been
        {' '}
        <strong>no deaths</strong>
        .
        {' '}
      </span>
    );
  } if (status === OutbreakStatus.Small) {
    return (
      <span>
        <strong>
          {OutbreakStatus.Small}
          :
          {' '}
        </strong>
        There have been
        {' '}
        <strong>less than 10 deaths</strong>
        .
      </span>
    );
  } if (status === OutbreakStatus.Losing) {
    return (
      <span>
        <strong>
          {OutbreakStatus.Losing}
          :
          {' '}
        </strong>
        Deaths rose by
        {' '}
        <strong>100% or more</strong>
        {' '}
        OR
        {' '}
        <strong>stayed above 1000</strong>
        .
      </span>
    );
  } if (status === OutbreakStatus.Flattening) {
    return (
      <span>
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
      </span>
    );
  } if (status === OutbreakStatus.Crushing) {
    return (
      <span>
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
      </span>
    );
  } if (status === OutbreakStatus.Winning) {
    return (
      <span>
        <strong>
          {OutbreakStatus.Winning}
          :
          {' '}
        </strong>
        New deaths decreased to
        {' '}
        <strong>below 10</strong>
        .
      </span>
    );
  } if (status === OutbreakStatus.Won) {
    return (
      <span>
        <strong>
          {OutbreakStatus.Won}
          :
          {' '}
        </strong>
        We have had
        {' '}
        <strong>no new deaths</strong>
        {' '}
        for
        {' '}
        <strong>two periods</strong>
        {' '}
        in a row.
      </span>
    );
  }
  return '';
};

const Legend = () => (
  <div className={styles.legend}>
    <h2>Legend</h2>
    <p>
      The items below all cover a single period, unless otherwise stated.
      A single period is
      {' '}
      <strong>5-days</strong>
      {' '}
      by default, though you can set your own period length when exploring the data.

    </p>
    <ul>
      <li className={styles.none}>
        {getStatusInfo(OutbreakStatus.None)}
      </li>
      <li className={styles.small}>
        {getStatusInfo(OutbreakStatus.Small)}
      </li>
      <li className={styles.losing}>
        {getStatusInfo(OutbreakStatus.Losing)}
      </li>
      <li className={styles.flattening}>
        {getStatusInfo(OutbreakStatus.Flattening)}
      </li>
      <li className={styles.crushing}>
        {getStatusInfo(OutbreakStatus.Crushing)}
      </li>
      <li className={styles.winning}>
        {getStatusInfo(OutbreakStatus.Winning)}
      </li>
      <li className={styles.won}>
        {getStatusInfo(OutbreakStatus.Won)}
      </li>
    </ul>
  </div>
);

export default Legend;
