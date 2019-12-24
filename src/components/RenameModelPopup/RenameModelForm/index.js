import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import styles from '../../User/newUserPopup/newUserPopup.module.scss';
import Input from '../../shared/Input';
import AlertMessage from '../../shared/AlertMessage';
import Caption from '../../shared/Caption';
import {
  getName,
  getErrorMessage,
  isError,
} from '../../../store/model/selectors';
import {
  changeNameValue,
} from '../../../store/model/actions';

const Index = ({
  name,
  changeName,
  errorMessage,
  isError,
}) => {
  const alertClasses = useMemo(() => [
    isError ? styles.visible : styles.hidden,
  ], [isError]);
  return (
    <div className={styles.maxWidth}>
      <Caption classes={styles.newUserCaption}> Change model name </Caption>
      <form>
        <div className={styles.inputFields}>
          <label className={styles.label} htmlFor="oldPassword">NEW NAME</label>
          <Input id="name" type="text" name="name" onChange={changeName} value={name} />
        </div>
        <AlertMessage message={errorMessage} classes={alertClasses}>
          <img src="/images/report.png" alt="error message" />
        </AlertMessage>
      </form>
    </div>
  );
};

Index.defaultProps = {
  errorMessage: '',
};

Index.propTypes = {
  name: PropTypes.string.isRequired,
  isError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  changeName: PropTypes.func.isRequired,
};
const mapStateToProps = createStructuredSelector({
  name: getName,
  isError,
  errorMessage: getErrorMessage,
});
const mapDispatchToProps = (dispatch) => ({
  changeName: (value) => { dispatch(changeNameValue(value)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
