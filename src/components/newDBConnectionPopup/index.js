import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { preventDefaultHandler } from '../../utils';
import '../shared/BasePopup/styles.scss';
import NewConnectionForm from './NewDBConnectionForm';
import { getVisible } from '../../store/connection/selectors';
import { newConnectionAction, onCloseAction } from '../../store/connection/actions';
import styles from './newDBConnectionPopup.module.scss';
import BasePopup from '../shared/BasePopup';

const NewConnection = ({
  isVisible,
  submitForm,
  onClose,
}) => {
  const formHandler = useMemo(
    () => preventDefaultHandler(submitForm),
    [submitForm]
  );
  return (
    <BasePopup
      onSubmit={formHandler}
      onClose={onClose}
      isVisible={isVisible}
      popupClassName={styles.dbconnectionpopup}
      okButtonType="submit"
      okButton={true}
      body={<NewConnectionForm />}
    />
  );
};

NewConnection.defaultProps = {
  onClose: () => {}
};

NewConnection.propTypes = {
  onClose: PropTypes.func,
  submitForm: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  isVisible: getVisible(state),
});
const mapDispatchToProps = (dispatch) => ({
  onClose: () => { dispatch(onCloseAction()); },
  submitForm: () => { dispatch(newConnectionAction()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewConnection);
