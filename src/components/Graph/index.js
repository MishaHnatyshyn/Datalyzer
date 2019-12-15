import React, { createRef, useEffect, useMemo } from 'react';
import { Doughnut, Pie, Line, Bar, Radar, HorizontalBar } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import styles from './graph.module.scss';

import applyMove from './moveFunction';

const graphTypes = {
  Doughnut,
  Pie,
  Line,
  Bar,
  Radar,
  HorizontalBar
};

const data = {
  labels: [
    'Red',
    'Green',
    'Yellow'
  ],
  datasets: [{
    data: [300, 50, 100],
    backgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
    ],
    hoverBackgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
    ]
  }]
};

const Graph = ({ type }) => {
  const paneRef = createRef();
  const ghostpaneRef = createRef();

  useEffect(() => {
    applyMove(paneRef.current, ghostpaneRef.current);
  }, []);

  const GraphToBuild = graphTypes[type];

  return (
    <>
      <div className={styles.pane} ref={paneRef}>
        <div className={styles.title}>
          <img src="/public/images/dashboard/move.svg" className={styles.hint}/>
        </div>
        <GraphToBuild data={data}/>
      </div>
      <div className={styles.ghostpane} ref={ghostpaneRef}>
      </div>
    </>
  );
};

Graph.propTypes = {
  type: PropTypes.oneOf(['Doughnut', 'Pie', 'Line', 'Bar', 'Radar', 'HorizontalBar']).isRequired
};

export default Graph;
