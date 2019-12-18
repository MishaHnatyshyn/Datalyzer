import React, { createRef, useEffect } from 'react';

import { Doughnut, Pie, Line, Bar, Radar, HorizontalBar } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import styles from './graph.module.scss';

import Movement from './moveFunction';

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

const Graph = ({ type, disableMoveAndScale, startLeftPosition, startTopPosition, startWidth }) => {
  const paneRef = createRef();
  const ghostpaneRef = createRef();

  const onUpdate = (width, left, top) => {console.log(width, left, top)};

  useEffect(() => {
    const pane = paneRef.current;

    pane.style.width = startWidth;
    pane.style.left = startLeftPosition;
    pane.style.top = startTopPosition;
  }, []);

  useEffect(() => {
    const pane = paneRef.current;
    const move = new Movement(pane, ghostpaneRef.current, onUpdate);
    if (disableMoveAndScale) {
      return move.removeEventListeners()
    }

    move.addEventListeners();
  }, [disableMoveAndScale]);

  const GraphToBuild = graphTypes[type];

  return (
    <>
      <div className={styles.pane} ref={paneRef}>
        {
          !disableMoveAndScale && (
            <div className={styles.title}>
              <img src="/public/images/dashboard/move.svg" className={styles.hint}/>
            </div>
          )
        }
        <GraphToBuild data={data}/>
      </div>
      <div className={styles.ghostpane} ref={ghostpaneRef}>
      </div>
    </>
  );
};

Graph.propTypes = {
  type: PropTypes.oneOf(['Doughnut', 'Pie', 'Line', 'Bar', 'Radar', 'HorizontalBar']).isRequired,
  disableMoveAndScale: PropTypes.bool,
  startLeftPosition: PropTypes.number,
  startTopPosition: PropTypes.number,
  startWidth: PropTypes.number
};

Graph.defaultProps = {
  disableMoveAndScale: false,
  startLeftPosition: 0,
  startTopPosition: 0,
  startWidth: 300,
};

export default Graph;
