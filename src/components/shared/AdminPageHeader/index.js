import React from 'react';
import PropTypes from 'prop-types';
import styles from './adminPageHeader.module.scss';
import CreateButton from '../CreateButton';
import Search from '../Search';
import Loader from '../Loader';

const AdminPageHeader = ({
  pageName, buttonText, countData, placeholder, search, searchValue, submitForm, link, button
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
    {
      button && (
      <CreateButton onclick={() => {}} type="button" link={link}>
        {buttonText}
      </CreateButton>
      )
    }
  </div>
);

AdminPageHeader.defaultProps = {
  button: true,
  link: '',
  buttonText: '',
};

AdminPageHeader.propTypes = {
  pageName: PropTypes.string.isRequired,
  button: PropTypes.bool,
  countData: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    count: PropTypes.number.isRequired,
  }).isRequired,
  placeholder: PropTypes.string.isRequired,
  search: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  submitForm: PropTypes.func.isRequired,
  link: PropTypes.string,
  buttonText: PropTypes.string
};

export default AdminPageHeader;
