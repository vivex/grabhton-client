import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import withStyles from '@material-ui/core/styles/withStyles';
import AlertMessages from './AlertMessage';

const styles = theme => ({
  margin: {
    margin: '10px',
  },
});

const AlertMessageSnackBar = (props) => {
  const { alert, closeAlerts } = props;


  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    closeAlerts();
  }

  return (
    <div>
      {alert
        ? (
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <AlertMessages
              onClose={handleClose}
              variant={alert.type || 'info'}
              message={alert.message}
            />
          </Snackbar>
        ) : '' }
    </div>
  );
};

AlertMessageSnackBar.propTypes = {
  alert: PropTypes.object,
  closeAlerts: PropTypes.func.isRequired,
};

export default withStyles(styles)(AlertMessageSnackBar);
