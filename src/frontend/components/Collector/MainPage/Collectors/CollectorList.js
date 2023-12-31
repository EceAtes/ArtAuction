import React from 'react';
import Collector from './Collector';
import styles from './CollectorList.module.css'; // Import the CSS module

const CollectorList = ({ title, collectors }) => (
  <div className={styles.collectorList}>
    <h2>{title}</h2>
    <div className={styles.horizontalScroll}>
      {collectors.map((collector) => (
        <Collector key={collector.id} {...collector} />
      ))}
    </div>
  </div>
);

export default CollectorList;

