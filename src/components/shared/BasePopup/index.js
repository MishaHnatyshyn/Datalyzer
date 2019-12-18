import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import PopupButtons from './components/PopupButtons';
import styles from './base.popup.module.scss';
import './styles.scss';

const defaultHandler = () => {
};

const BasePopup = ({
  onClose,
  onSubmit,
  text,
  image,
  okButton,
  cancelButton,
  isVisible,
  title,
  okButtonType,
  body,
  popupClassName,
  footer
}) => {
  const backgroundHandler = useCallback((e) => (
    e.currentTarget === e.target && onClose()
  ), [onClose]);

  return (
    <CSSTransition
      in={isVisible}
      timeout={300}
      classNames="alert"
      unmountOnExit
    >
      <div className={classnames(styles.popupWrapper, popupClassName)}>
        <div className={styles.blur} onClick={backgroundHandler} />
        <div className={styles.popup}>
          <div className={styles.header}>
            <div className={styles.cross} onClick={onClose}>
              <img src="/images/Popup/cross.png" alt="" />
            </div>
          </div>
          <div className={styles.body}>
            {
              body || (
                <>
                  <div className={styles.image}>
                    {image}
                  </div>
                  <div className={styles.title}>
                    {title}
                  </div>
                  <div className={styles.text}>
                    {text}
                  </div>
                </>
              )
            }
            {
              footer && (
                <div className={styles.buttons}>
                  <PopupButtons
                    okButton={okButton}
                    cancelButton={cancelButton}
                    onSubmit={onSubmit}
                    onClose={onClose}
                    okButtonType={okButtonType}
                  />
                </div>
              )
            }
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

BasePopup.propTypes = {
  text: PropTypes.string,
  image: PropTypes.element,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  okButton: PropTypes.bool,
  cancelButton: PropTypes.bool,
  isVisible: PropTypes.bool,
  okButtonType: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  body: PropTypes.element,
  popupClassName: PropTypes.string,
  footer: PropTypes.bool,
};

BasePopup.defaultProps = {
  text: '',
  title: '',
  okButton: false,
  cancelButton: true,
  isVisible: true,
  onClose: defaultHandler,
  onSubmit: defaultHandler,
  image: null,
  okButtonType: 'ok',
  body: null,
  popupClassName: '',
  footer: true
};

export default BasePopup;
