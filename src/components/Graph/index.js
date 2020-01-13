import React, {
  createRef, useEffect, useCallback, useState
} from 'react';
import classNames from 'classnames';
import {
  Doughnut, Pie, Line, Bar, Radar, HorizontalBar
} from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './graph.module.scss';
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

const Graph = (props) => {
  const {
    type, disableMoveAndScale, startLeftPosition, startTopPosition, startWidth, items,
    facts, dimensions, updateReport, id, viewPortRef, className
  } = props;

  const paneRef = createRef();
  const dimension = dimensions[0];
  const fact = facts[0];
  const data = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: []
    }]
  };

  items.forEach((item) => {
    data.labels.push(item[dimension]);
    data.datasets[0].data.push(item[fact]);
    data.datasets[0].backgroundColor.push(getRandomColor());
  });

  const [defaultStyles] = useState({
    width: startWidth,
    left: startLeftPosition,
    top: startTopPosition,
  });

  const onUpdate = useCallback((data) => {
    updateReport(id, data);
  }, [id, updateReport]);

  useEffect(() => {
    const pane = paneRef.current;
    const move = new Movement(pane, viewPortRef.current, onUpdate);
    if (disableMoveAndScale) {
      return move.removeEventListeners();
    }

    move.addEventListeners();
  }, [disableMoveAndScale]);

  const GraphToBuild = graphTypes[type];

  return (
    <div className={classNames(className, styles.pane)} ref={paneRef} style={defaultStyles}>
      {
        !disableMoveAndScale && (
          <div className={styles.title}>
            <img src="/public/images/dashboard/move.svg" className={styles.hint} alt="move" />
          </div>
        )
      }
      <GraphToBuild data={data} options={defaultOptions} />
    </div>
  );
};

Graph.propTypes = {
  type: PropTypes.oneOf(['Doughnut', 'Pie', 'Line', 'Bar', 'Radar', 'HorizontalBar']).isRequired,
  disableMoveAndScale: PropTypes.bool,
  startLeftPosition: PropTypes.number,
  startTopPosition: PropTypes.number,
  startWidth: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.shape()),
  facts: PropTypes.arrayOf(PropTypes.shape()),
  dimensions: PropTypes.arrayOf(PropTypes.shape()),
  viewPortRef: PropTypes.shape(),
  updateReport: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  className: PropTypes.string

};

Graph.defaultProps = {
  disableMoveAndScale: false,
  startLeftPosition: 0,
  startTopPosition: 0,
  startWidth: 300,
  facts: [],
  dimensions: [],
  items: [],
  viewPortRef: {},
  className: ''
};

const mapDispatchToProps = (dispatch) => ({
  updateReport: (id, data) => {
    dispatch(updateReport(id, data));
  }
});

export default connect(null, mapDispatchToProps)(Graph);
