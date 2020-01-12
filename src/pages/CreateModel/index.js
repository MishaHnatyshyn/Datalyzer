import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styles from './createModel.module.scss';
import StepsMenu from '../../components/shared/StepsMenu';
import { getModelName, getStep } from '../../store/createModel/selectors';
import StepMenuButtons from '../../components/shared/StepsMenuButtons';
import ConnectionCardList from '../../components/shared/ConnectionCardList';
import TablesSelection from '../../components/TablesSelection';
import CancelButton from '../../components/shared/CancelButton';
import RelationSection from '../../components/RelationSection';
import { displayCustomPopup } from '../../store/popups/actions';
import PopupTypes from '../../store/popups/popupTypes';
import { changeModelName, resetCreateModelState } from '../../store/createModel/actions';
import UsersAccessToModel from '../UsersAccessToModel';

const StepsHeaders = [
  'Select Database Connection',
  'Add tables to the model',
  'Add relations',
  'Add access to the model',
];

const modelNameErrorClasses = classnames(styles.nameInput, styles.nameInputError);

const CreateModel = ({
  activeStep, cancel, reset, changeModelName, modelName
}) => {
  useEffect(() => reset, []);
  const nameInputClasses = useMemo(
    () => (activeStep === 4 && modelName.length === 0 ? modelNameErrorClasses : styles.nameInput),
    [activeStep, modelName],
  );
  const headerText = useMemo(() => StepsHeaders[activeStep - 1], [activeStep]);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <input
          className={nameInputClasses}
          onChange={changeModelName}
          type="text"
          placeholder="Type model name..."
          value={modelName}
        />
        <StepsMenu stepsAmount={4} />
        <div className={styles.buttonContainer}>
          <CancelButton onClick={cancel}>cancel</CancelButton>
        </div>
      </div>
      <p className={classnames(styles.caption, styles.action)}>{headerText}</p>
      <div className={styles.content}>
        {activeStep === 1 && <ConnectionCardList />}
        {activeStep === 2 && <TablesSelection />}
        {activeStep === 3 && <RelationSection />}
        {activeStep === 4 && <UsersAccessToModel />}
      </div>

      <StepMenuButtons classes={styles.stepsButton} />
    </div>
  );
};

CreateModel.propTypes = {
  changeModelName: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  modelName: PropTypes.string.isRequired,
  activeStep: PropTypes.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  activeStep: getStep,
  modelName: getModelName,
});

const mapDispatchToProps = (dispatch) => ({
  cancel: () => {
    dispatch(displayCustomPopup(PopupTypes.CREATE_MODEL_CANCEL_CONFIRM));
  },
  reset: () => {
    dispatch(resetCreateModelState());
  },
  changeModelName: (e) => {
    dispatch(changeModelName(e.target.value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateModel);
