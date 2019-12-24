import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import AdminPageHeader from '../../components/shared/AdminPageHeader';
import { getSearchInputText } from '../../store/dashboard/selectors';
import { changeSearchInput, searchDashboards } from '../../store/dashboard/actions';
import { getUserModelCountData } from '../../store/model/selectors';

const mapStateToProps = createStructuredSelector({
  searchValue: getSearchInputText,
  countData: getUserModelCountData,
});

const mapDispatchToProps = (dispatch) => ({
  search: (e) => {
    dispatch(changeSearchInput(e.target.value));
  },
  submitForm: () => {
    dispatch(searchDashboards());
  },
});

const ModelsPageHeader = (props) => (
  <AdminPageHeader
    {...props}
    button={false}
    pageName="Total models"
    placeholder="search by name..."
  />
);

export default connect(mapStateToProps, mapDispatchToProps)(ModelsPageHeader);
