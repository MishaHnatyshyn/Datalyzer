import React, { createRef, useEffect, useCallback } from 'react';

import { Doughnut, Pie, Line, Bar, Radar, HorizontalBar } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import styles from './graph.module.scss';
import { connect } from 'react-redux';
import Movement from './moveFunction';
import { updateReport } from '../../store/userDashboard/actions';

const graphTypes = {
  Doughnut,
  Pie,
  Line,
  Bar,
  Radar,
  HorizontalBar
};

const defaultOptions = {
  legend: {
    display: false
  },
  tooltips: {
    callbacks: {
      label: function(tooltipItem) {
        return tooltipItem.yLabel;
      }
    }
  }
};

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Graph = ({ type, disableMoveAndScale, startLeftPosition, startTopPosition, startWidth, items, facts, dimensions, updateReport, id }) => {
  const paneRef = createRef();
  const ghostpaneRef = createRef();
  const dimension = dimensions[0];
  const fact = facts[0];
  const data = {
    labels: items.map((item) => item[dimension]),
    datasets: [{
      data: items.map(item => item[fact]),
      backgroundColor: items.map(() => getRandomColor())
    }],
    legend: {
      display: false
    },
    tooltips: {
      enabled: false
    }
  };

  useEffect(() => {
    const pane = paneRef.current;

    pane.style.width = startWidth;
    pane.style.left = startLeftPosition;
    pane.style.top = startTopPosition;
  }, []);

  const onUpdate = useCallback((data) => {
    updateReport(id, data)
  }, [id, updateReport]);

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
        <GraphToBuild data={data} options={defaultOptions} />
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

const mapDispatchToProps = (disatch) => {
  return {
    updateReport: (id, data) => {disatch(updateReport(id, data))}
  }
};

export default connect(null, mapDispatchToProps)(Graph);
