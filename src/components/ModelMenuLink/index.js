import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './modelMenuLink.module.scss';

const ModelMenuLink = ({ children, onClick, model }) => {
  const handleClick = useCallback(() => {
    onClick(model);
  }, [model, onClick]);

  return (
    <div className={styles.container} onClick={handleClick}>
      <p className={styles.text}>{children}</p>
      <img src="/images/back.png" alt="arrow right" />
    </div>
  );
};

ModelMenuLink.defaultProps = {
  onClick: () => {}
};

ModelMenuLink.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  model: PropTypes.oneOf([PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      relations: PropTypes.arrayOf(PropTypes.string),
      fields: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        type: PropTypes.string
      }))
    }))
  }), null]).isRequired,
};

export default ModelMenuLink;
