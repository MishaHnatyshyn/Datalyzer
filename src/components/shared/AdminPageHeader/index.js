import React from 'react';
import PropTypes from 'prop-types';
import styles from './adminPageHeader.module.scss';
import CreateButton from '../CreateButton';
import Search from '../Search';

const AdminPageHeader = ({
  pageName, buttonText, countData, placeholder, search, searchValue, submitForm
}) => (
  <div className={styles.container}>
    <div className={styles.leftBlock}>
      <p className={styles.pagesResult}>{`${pageName}: ${countData.isLoading ? 'loading...' : countData.count}`}</p>
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
