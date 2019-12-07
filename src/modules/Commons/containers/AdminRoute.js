/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { ActionTypes } from '../../../actions';


const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
});

const mapDispatcherToProps = dispatch => ({
  fetchUser: () => {
    dispatch({ type: ActionTypes.FETCH_USER });
  },
});

const AdminRoute = ({ Component, fetchUser, ...rest }) => {
  useEffect(() => fetchUser(), []); // component did mount

  return (
    <Route
      {...rest}
      render={props => (
        localStorage.getItem('TOKEN')
          ? <Component {...props} />
          : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      )}
    />
  );
};

export default connect(mapStateToProps, mapDispatcherToProps)(AdminRoute);
