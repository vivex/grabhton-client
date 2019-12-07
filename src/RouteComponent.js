import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ActionTypes from './actions/ActionTypes';

const RouteComponent = (props) => {
  const { onRouteChange, name, Comp } = props;
  useEffect(() => {
    // Update the document title using the browser API
    onRouteChange({
      name,
    });
  });
  return (<Comp {...props} />);
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  onRouteChange: (currentRoute) => {
    dispatch({ type: ActionTypes.UPDATE_CURRENT_ROUTE, payload: currentRoute });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RouteComponent);
