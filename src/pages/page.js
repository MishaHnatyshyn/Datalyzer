import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NewUserPopup from '../components/User/newUserPopup';
import NewConnection from '../components/newDBConnectionPopup';
const UsersAdmin = () => (
  <NewUserPopup />
);



export default UsersAdmin;
