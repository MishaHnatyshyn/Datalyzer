import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './select.module.scss';

const Select = ({
  options, value, name, onChange
}) => {
  const [openedDropDown, handleDropDown] = useState(false);
  const handleClick = useCallback(
    (option, event) => {
      event.target.name = name;
      event.target.value = option;
      onChange(event);
      handleDropDown(false);
    },
    [onChange],
  );

  return (
    <div className={styles.container}>
      <div className={styles.selectedValue} onClick={() => handleDropDown(!openedDropDown)}>
        <p>{value}</p>
        <img src="/images/next.png" alt="arrow down" className={styles.arrow} />
      </div>
      {openedDropDown && (
        <div className={styles.optionsBlock}>
          {options.map((option) => (
            <div className={styles.options} onClick={handleClick.bind(null, option)}>
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Select;
