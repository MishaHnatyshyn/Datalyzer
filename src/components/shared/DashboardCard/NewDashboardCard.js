import React, {
  useState, useRef, useCallback, useEffect
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import styles from './dashboardCard.module.scss';
import NewModeInput from '../NewModeInput';
import { getNewDashboardName } from '../../../store/createReport/selectors';
import { changeNewDashboardName, createReport } from '../../../store/createReport/actions';
import NextButton from '../NextButton';

const NewDashboardCard = ({
  selected, onClick, changeNewDashboardName, newDashboardName, createReport
}) => {
  const [isOpened, setOpened] = useState(false);
  const popupRef = useRef(null);
  const buttonRef = useRef(null);
  const handleCardClickOutside = useCallback((e) => {
    const isNotButton = e.target !== buttonRef.current && !buttonRef.current.contains(e.target);
    const isNotPopup = e.target !== popupRef.current && !popupRef.current.contains(e.target);
    if (isNotPopup && isNotButton) {
      setOpened(false);
    }
  });

  useEffect(() => {
    window.addEventListener('click', handleCardClickOutside);
    return () => {
      window.removeEventListener('click', handleCardClickOutside);
    };
  }, []);

  return (
    <div className={styles.block}>
      <button
        ref={buttonRef}
        className={classnames(styles.container, styles.newDashboard, selected)}
        onClick={() => {
          onClick();
          setOpened(!isOpened);
        }}
      >
        <img src="/images/newDashboard.png" alt="dashboard" />
        <p className={styles.name}>New dashboard</p>
      </button>
      {isOpened && (
        <div className={styles.popupContainer} ref={popupRef}>
          <p className={styles.newText}>New dashboard name</p>
          <NewModeInput
            changeValue={changeNewDashboardName}
            value={newDashboardName}
            classes={styles.input}
            placeholder="New dashboard name"
          />
          <div className={styles.buttonContainer}>
            <NextButton disableNextButton={!newDashboardName} setNextStep={createReport} text="Create report" />
          </div>
        </div>
      )}
    </div>
  );
};

NewDashboardCard.defaultProps = {
  selected: '',
};

NewDashboardCard.propTypes = {
  changeNewDashboardName: PropTypes.func.isRequired,
  newDashboardName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.string,
  createReport: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  newDashboardName: getNewDashboardName,
});

const mapDispatchToProps = (dispatch) => ({
  changeNewDashboardName: (e) => dispatch(changeNewDashboardName(e.target.value)),
  createReport: () => dispatch(createReport())
});

export default connect(mapStateToProps, mapDispatchToProps)(NewDashboardCard);
