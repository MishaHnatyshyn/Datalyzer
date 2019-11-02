/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { LOGIN_URL } from '../../../config/routing';
import { createHomeRoute } from '../../../utils/routeCreators';
import ConditionalRoute from './ConditionalRouteBaseComponent';

export const ProtectedRoute = ({
  component: Component, allowedUserType
}) => (
  <ConditionalRoute
    render={({ props, token, userType }) => (
      token && allowedUserType === userType
        ? <Component {...props} />
        : <Redirect to={LOGIN_URL} />)}
  />
);

export const NotLoggedInRoute = ({
  component: Component
}) => (
  <ConditionalRoute
    render={({ props, token, userType }) => (
      token && userType
        ? <Redirect to={createHomeRoute()} />
        : <Component {...props} />)}
  />
);

export const ProtectedAdminRoute = (props) => <ProtectedRoute {...props} allowedUserType="admin" />;
export const ProtectedUserRoute = (props) => <ProtectedRoute {...props} allowedUserType="user" />;

ProtectedRoute.propTypes = {
  component: PropTypes.node.isRequired,
  allowedUserType: PropTypes.string.isRequired,
};

NotLoggedInRoute.propTypes = {
  component: PropTypes.node.isRequired,
};
