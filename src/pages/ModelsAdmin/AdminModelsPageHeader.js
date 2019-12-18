import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import AdminPageHeader from '../../components/shared/AdminPageHeader';
import { getModelsCountData, getSearchInputText } from '../../store/model/selectors';
import { changeSearchInput, searchModels } from '../../store/model/actions';

const AdminModelsPageHeader = (props) => (
  <AdminPageHeader
    {...props}
    buttonText="Create model"
    pageName="Total models"
    placeholder="search by name..."
    link="/admin/models/create"
  />
);

const mapStateToProps = createStructuredSelector({
  searchValue: getSearchInputText,
  countData: getModelsCountData,
});

const mapDispatchToProps = (dispatch) => ({
  search: (e) => {
    dispatch(changeSearchInput(e.target.value));
  },
  submitForm: () => {
    dispatch(searchModels());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminModelsPageHeader);
