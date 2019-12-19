import React, { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import styles from './dashboardMenu.module.scss';
import { createStructuredSelector } from 'reselect';
import { getDashboard, getDashboardName } from '../../../../store/userDashboard/selectors';
import { getDashboards } from '../../../../store/dashboard/selectors';
import { fetchDashboards } from '../../../../store/dashboard/actions';
import jsPDF from 'jspdf';
import { displayConfirmationPopup, closePopup } from '../../../../store/popups/actions';
import { removeCurrentDashboar } from '../../../../store/userDashboard/actions';

const DashboardMenu = ({ dashboardName, dashboards, dashboard, fetchDashboards, openConfirmationPopup }) => {
  useEffect(() => {
    if (dashboards.length) {
      return
    }

    fetchDashboards();
  }, []);

  dashboards = dashboards.filter(({ id }) => id !== dashboard.id);

  const onExport = useCallback(() => {
    const pdf = new jsPDF();
    const pdfWidth =  pdf.internal.pageSize.getWidth();

    const layout = document.getElementById('dashboard-layout');
    layout.childNodes.forEach((node, i) => {
      if (node.lastChild) {
        const canvas = node.lastChild;
        const img = canvas.toDataURL("image/png");
        if (i !== 0) {
          pdf.addPage()
        }

        pdf.addImage(img, 'PNG', 0, 0, pdfWidth, ((canvas.height - canvas.width) / 3.779528) + pdfWidth);
      }
    });

    pdf.save('export.pdf')
  });

  const onDelete = useCallback(() => {
    openConfirmationPopup(dashboard.id)
  }, [openConfirmationPopup, dashboard]);

  return (
    <div className={styles.menu}>
      <div className={styles.title}>
        {dashboardName}
      </div>
      <div className={styles.item}>Change name</div>
      <div className={styles.item} onClick={onExport}>Export as PDF</div>
      <div className={styles.item} onClick={onDelete}>Delete</div>

      <div className={styles.separator}/>

      <div className={styles.title}>
        Other dashboards
      </div>

      <div>
        {
          dashboards.map(({ name, id }) => (
            <Link to={id} key={id} className={styles.link}>
              <span className={styles.item}>
                {name}
              </span>
              <img src="/public/images/dashboard/arrow-right.svg" alt="" className={styles.arrow} />
            </Link>
          ))
        }
      </div>
    </div>
  )
};

DashboardMenu.propTypes = {
  dashboardName: PropTypes.string,
  dashboards: PropTypes.array,
};

DashboardMenu.defaultProps = {
  dashboards: [{name: 'kek', id: 1}],
  dashboardName: 'Dashboard name'
};

const mapStateToProps = createStructuredSelector(
  {
    dashboardName: getDashboardName,
    dashboards: getDashboards,
    dashboard: getDashboard,
  }
);

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDashboards: () => {dispatch(fetchDashboards())},
    openConfirmationPopup: (id) => {dispatch(displayConfirmationPopup({
      text: 'Are you sure you want do delete this dashboard?',
      onSubmit: () => {
        dispatch(removeCurrentDashboar(id));
        dispatch(closePopup());
      }
    }))}
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardMenu);
