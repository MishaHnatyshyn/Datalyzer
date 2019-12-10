import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './adminPageHeader.module.scss';
import CreateButton from '../CreateButton';
import Search from '../Search';
import Loader from '../Loader';
import { showConnectionPopup } from '../../../store/connection/actions';

const AdminPageHeader = ({
  pageName, buttonText, countData, placeholder, search, searchValue, submitForm, showPopup
}) => (
  <div className={styles.container}>
    <div className={styles.leftBlock}>
      <div className={styles.pagesResult}>
        <span>{`${pageName}: `}</span>
        <span className={styles.pagesCountBlock}>
          {countData.isLoading ? <Loader classes={styles.spinner} /> : countData.count}
        </span>
      </div>
      <Search
        placeholder={placeholder}
        onChange={search}
        value={searchValue}
        submitForm={submitForm}
      />
    </div>
    <CreateButton onclick={showPopup} type="button">
      {buttonText}
    </CreateButton>
  </div>
);

AdminPageHeader.propTypes = {
  pageName: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  showPopup: PropTypes.func.isRequired,
  countData: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    count: PropTypes.number.isRequired,
  }).isRequired,
  placeholder: PropTypes.string.isRequired,
  search: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  submitForm: PropTypes.func.isRequired
};
const mapDispatchToProps = (dispatch) => ({
  showPopup: (value) => { dispatch(showConnectionPopup(value)); },
});

export default connect(null, mapDispatchToProps)(AdminPageHeader);
