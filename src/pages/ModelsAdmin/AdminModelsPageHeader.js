import React from 'react';
import { connect } from 'react-redux';
import AdminPageHeader from '../../components/shared/AdminPageHeader';
import { getModelsCountData, getSearchInputText } from '../../store/model/selectors';
import { changeSearchInput, searchModels } from '../../store/model/actions';

const mapStateToProps = (state) => ({
  searchValue: getSearchInputText(state),
  countData: getModelsCountData(state)
});

const mapDispatchToProps = (dispatch) => ({
  search: (e) => { dispatch(changeSearchInput(e.target.value)); },
  submitForm: () => { dispatch(searchModels()); }
});

const AdminModelsPageHeader = (props) => (
  <AdminPageHeader
    {...props}
    buttonText="Create model"
    pageName="Total models"
    placeholder="search by name..."
  />
);

export default connect(mapStateToProps, mapDispatchToProps)(AdminModelsPageHeader);
