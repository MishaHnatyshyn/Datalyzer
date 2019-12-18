import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './homeCard.module.scss';

const HomeCard = ({
  image, text, icon, containerClass, lineClass, link
}) => (
  <div className={classnames(styles.container, containerClass)}>
    <div className={styles.upperBlock}>
      <img src={image} className={styles.mainImage} alt="type" />
      <div className={classnames(styles.line, lineClass)} />
    </div>
    <div className={styles.bottomBlock}>
      <p className={styles.text}>{text}</p>
      <Link to={link}><img src={icon} className={styles.icon} alt="go to" /></Link>
    </div>
  </div>
);

HomeCard.defaultProps = {
  containerClass: '',
  lineClass: ''
};

HomeCard.propTypes = {
  image: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  containerClass: PropTypes.string,
  lineClass: PropTypes.string,
  link: PropTypes.string.isRequired
};

export default HomeCard;
