import React from 'react';
import PropTypes from 'prop-types';
import styles from './prevButton.module.scss';
import Button from '../Button';

const PrevButton = ({ setPrevStep }) => (
  <Button classes={[styles.button, styles.prevButton]} type="button" onclick={setPrevStep}>
    <img className={styles.prevIcon} src="/images/left-arrow-gray.png" alt="arrow next" />
  </Button>
);

PrevButton.propTypes = {
  setPrevStep: PropTypes.func.isRequired,
};

export default PrevButton;
