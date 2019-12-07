import AlertMessageSnackBar from '../components/AlertMessageSnackBar';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
  closeAlerts: (alertId) => {
    dispatch({ type: 'CLOSE_ALERT', payload: alertId });
  },
});
const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  alert: state.alert,
});


export default connect(mapStateToProps, mapDispatchToProps)(AlertMessageSnackBar);
