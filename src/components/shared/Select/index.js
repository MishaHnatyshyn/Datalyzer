import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './select.module.scss';

const Select = ({
  options, value, name, onChange, classes
}) => {
  const [openedDropDown, handleDropDown] = useState(false);
  const handleClick = useCallback(
    (option, event) => {
      event.target.name = name;
      event.target.value = option.value || option;
      onChange(event);
      handleDropDown(false);
    },
    [onChange],
  );
  const selectedValue = useMemo(() => {
    if (options[0] && options[0].name) {
      const selectedOption = options.find(_ => _.value === value);
      if (selectedOption) {
        return selectedOption.name;
      }
    }
    return value;
  }, [value])
  return (
    <div className={classnames(styles.container, classes)}>
      <div className={styles.selectedValue} onClick={() => handleDropDown(!openedDropDown)}>
        <p>{selectedValue}</p>
        <img src="/images/next.png" alt="arrow down" className={styles.arrow} />
      </div>
      {openedDropDown && (
        <div className={styles.optionsBlock}>
          {options.map((option) => (
            <div className={styles.options} onClick={handleClick.bind(null, option)}>
              {option.name || option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Select.defaultProps = {
  classes: '',
}

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.oneOf([
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.oneOf([PropTypes.string, PropTypes.number]).isRequired
    }),
    PropTypes.string
  ])).isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.string,
};

export default Select;
