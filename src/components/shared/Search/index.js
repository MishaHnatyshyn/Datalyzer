import React, { useMemo } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './search.module.scss';
import { preventDefaultHandler } from '../../../utils';

const Search = ({
  placeholder, onChange, value, submitForm, classes
}) => {
  const searchHandler = useMemo(
    () => preventDefaultHandler(submitForm),
    [submitForm]
  );

  return (
    <form className={styles.container} onSubmit={searchHandler}>
      <input
        className={classnames(styles.input, classes)}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      <button className={styles.search} type="submit"><img src="/images/search.png" alt="search" className={styles.icon} /></button>
    </form>
  );
};

Search.defaultProps = {
  classes: ''
};

Search.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  submitForm: PropTypes.func.isRequired,
  classes: PropTypes.string
};

export default Search;
