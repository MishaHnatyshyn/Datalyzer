/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Redirect, Route } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { LOGIN_URL } from '../../../config/routing';
import { getToken } from '../../../store/login/selectors';
import { getType } from '../../../store/user/selectors';

const BaseProtectedRouteComponent = ({
  component: Component, token, userType, allowedUserType, ...rest
}) => (
  <Route
    {...rest}
    render={(props) => (
      token && allowedUserType === userType
        ? <Component {...props} />
        : <Redirect to={LOGIN_URL} />)}
  />
);

const mapStateToProps = (state) => ({
  token: getToken(state),
  userType: getType(state)
});

const ProtectedRoute = connect(mapStateToProps)(BaseProtectedRouteComponent);

export const ProtectedAdminRoute = (props) => <ProtectedRoute {...props} allowedUserType="admin" />;
export const ProtectedUserRoute = (props) => <ProtectedRoute {...props} allowedUserType="user" />;

BaseProtectedRouteComponent.propTypes = {
  component: PropTypes.node.isRequired,
  token: PropTypes.string.isRequired,
  userType: PropTypes.string.isRequired,
  allowedUserType: PropTypes.string.isRequired,
};

export default ProtectedRoute;
