/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getToken } from '../../../store/login/selectors';
import { getUserType } from '../../../store/user/selectors';

const ConditionalRouteBaseComponent = ({
  render, token, userType, ...rest
}) => (
  <Route
    {...rest}
    render={(props) => render({ props, token, userType })}
  />
);

ConditionalRouteBaseComponent.propTypes = {
  render: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  userType: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  token: getToken(state),
  userType: getUserType(state)
});

export default connect(mapStateToProps)(ConditionalRouteBaseComponent);
