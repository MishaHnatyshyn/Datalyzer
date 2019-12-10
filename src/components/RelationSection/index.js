import React, { useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { getRelations } from '../../store/createModel/selectors';
import { fetchConnectionRelationsData, toggleRelation } from '../../store/createModel/actions';
import RelationItem from './RelationItem';
import RelationTableHeader from './RelationTableHeader';
import styles from './relationSection.module.scss';

const scrollAreaStyle = { height: '95%' };

const RelationSection = ({ getConnectionRelationsData, relations, toggleRelation }) => {
  useEffect(() => getConnectionRelationsData(), []);
  return (
    <div className={styles.container}>
      <RelationTableHeader />
      <Scrollbars style={scrollAreaStyle} autoHide={false}>
        {relations.map((relation, index) => (
          <RelationItem {...relation} index={index} toggleRelation={toggleRelation} />
        ))}
      </Scrollbars>
    </div>
  );
};

RelationSection.propTypes = {
  getConnectionRelationsData: PropTypes.func.isRequired,
  relations: PropTypes.arrayOf(
    PropTypes.shape({
      foreignTable: PropTypes.string.isRequired,
      fkColumn: PropTypes.string.isRequired,
      primaryTable: PropTypes.string.isRequired,
      pkColumn: PropTypes.string.isRequired,
      include: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  toggleRelation: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  relations: getRelations,
});

const mapDispatchToProps = (dispatch) => ({
  toggleRelation: (index) => {
    dispatch(toggleRelation(index));
  },
  getConnectionRelationsData: () => {
    dispatch(fetchConnectionRelationsData());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RelationSection);
