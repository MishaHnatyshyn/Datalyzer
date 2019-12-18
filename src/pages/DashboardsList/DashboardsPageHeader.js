import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import AdminPageHeader from '../../components/shared/AdminPageHeader';
import { getDashboardsCountData, getSearchInputText } from '../../store/dashboard/selectors';
import { changeSearchInput, searchDashboards } from '../../store/dashboard/actions';

const mapStateToProps = createStructuredSelector({
  searchValue: getSearchInputText,
  countData: getDashboardsCountData,
});

const mapDispatchToProps = (dispatch) => ({
  search: (e) => {
    dispatch(changeSearchInput(e.target.value));
  },
  submitForm: () => {
    dispatch(searchDashboards());
  },
});

const DashboardsPageHeader = (props) => (
  <AdminPageHeader
    {...props}
    button={false}
    pageName="Total dashboards"
    placeholder="search by name..."
  />
);

export default connect(mapStateToProps, mapDispatchToProps)(DashboardsPageHeader);
