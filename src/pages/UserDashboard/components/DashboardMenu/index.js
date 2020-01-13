import React, { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import JsPDF from 'jspdf';
import styles from './dashboardMenu.module.scss';
import { getDashboardName } from '../../../../store/userDashboard/selectors';
import { getDashboards } from '../../../../store/dashboard/selectors';
import { fetchDashboards, setDashboardForDelete } from '../../../../store/dashboard/actions';
import { displayCustomPopup } from '../../../../store/popups/actions';
import PopupTypes from '../../../../store/popups/popupTypes';

const DashboardMenu = ({
  dashboardName, dashboards, fetchDashboards, deleteDashboard, id
}) => {
  useEffect(() => {
    if (dashboards.length) {
      return;
    }

    fetchDashboards();
  }, []);

  const onExport = useCallback(() => {
    const pdf = new JsPDF();
    const pdfWidth = pdf.internal.pageSize.getWidth();

    const layout = document.getElementById('dashboard-layout');
    layout.childNodes.forEach((node, i) => {
      if (node.lastChild) {
        const canvas = node.lastChild;
        const img = canvas.toDataURL('image/png');
        if (i !== 0) {
          pdf.addPage();
        }

        pdf.addImage(img, 'PNG', 0, 0, pdfWidth, ((canvas.height - canvas.width) / 3.779528) + pdfWidth);
      }
    });

    pdf.save('export.pdf');
  });

  const removeDashboard = useCallback(() => {
    deleteDashboard(id);
  }, [deleteDashboard, id]);

  return (
    <div className={styles.menu}>
      <div className={styles.title}>
        {dashboardName}
      </div>
      <div className={styles.item}>Change name</div>
      <div className={styles.item} onClick={onExport}>Export as PDF</div>
      <div className={styles.item} onClick={removeDashboard}>Delete</div>

      <div className={styles.separator} />

      <div className={styles.title}>
        Other dashboards
      </div>

      <div>
        {
          dashboards.map(({ name, id }) => (
            <Link to={`${id}`} key={id} className={styles.link}>
              <span className={styles.item}>
                {name}
              </span>
              <img src="/public/images/dashboard/arrow-right.svg" alt="" className={styles.arrow} />
            </Link>
          ))
        }
      </div>
    </div>
  );
};

DashboardMenu.propTypes = {
  dashboardName: PropTypes.string,
  dashboards: PropTypes.arrayOf(PropTypes.shape),
  fetchDashboards: PropTypes.func.isRequired,
  deleteDashboard: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
};

DashboardMenu.defaultProps = {
  dashboards: [{ name: 'kek', id: 1 }],
  dashboardName: 'Dashboard name'
};

const mapStateToProps = createStructuredSelector(
  {
    dashboardName: getDashboardName,
    dashboards: getDashboards
  }
);

const mapDispatchToProps = (dispatch) => ({
  fetchDashboards: () => { dispatch(fetchDashboards()); },
  deleteDashboard: (id) => {
    dispatch(setDashboardForDelete(id));
    dispatch(displayCustomPopup(PopupTypes.DELETE_DASHBOARD));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardMenu);
