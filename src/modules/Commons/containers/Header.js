import { connect } from 'react-redux';
import Header from '../components/Header';
import ActionTypes from '../../../actions/ActionTypes';


const mapDispatchToProps = dispatch => ({
  fetchResumeList: () => {
    //dispatch({ type: ActionTypes.FETCH_USER_RESUMES });
  },
});
const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  user: state.user.profile,
  currentRoute: state.currentRoute,
  resumeListLoaded: state.user.resumeListLoaded,
  isLoadingResumeList: state.user.isLoadingResumeList,
  resumeList: state.user.resumeList,
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
