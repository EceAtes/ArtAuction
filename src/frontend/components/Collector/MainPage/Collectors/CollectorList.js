// components/CollectorList.js
import React from 'react';
import Collector from './Collector';
import styles from './Collector.module.css'; // Import the CSS module

const CollectorList = ({ title, collectors }) => (
  <div className={styles['collector-list']}>
    <h2>{title}</h2>
    <div className={styles['horizontal-scroll']}>
      {collectors.map((collector) => (
        <Collector key={collector.id} {...collector} />
      ))}
    </div>
  </div>
);

export default CollectorList;
