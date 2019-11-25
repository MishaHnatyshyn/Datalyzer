import React from 'react';
import PropTypes from 'prop-types';
import styles from './adminPageHeader.module.scss';
import CreateButton from '../CreateButton';
import Search from '../Search';
import Loader from '../Loader';

const AdminPageHeader = ({
  pageName, buttonText, countData, placeholder, search, searchValue, submitForm
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
    <CreateButton onclick={() => {}} type="button">
      {buttonText}
    </CreateButton>
  </div>
);

AdminPageHeader.propTypes = {
  pageName: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  countData: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    count: PropTypes.number.isRequired,
  }).isRequired,
  placeholder: PropTypes.string.isRequired,
  search: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  submitForm: PropTypes.func.isRequired
};

export default AdminPageHeader;
