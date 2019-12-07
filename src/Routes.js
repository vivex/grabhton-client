import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import PrivateRoute from './modules/Commons/containers/PrivateRoute';
import AdminRoute from './modules/Commons/containers/AdminRoute';
import Home from './modules/Home/containers/Home';

import RouteComponent from './RouteComponent';

const Routes = () => (
  <Router>
    <Switch>
      <Route
        exact
        name="dashboard"
        path="/"
        component={routeProps => (<RouteComponent name="dashboard" Comp={Home} {...routeProps} />)}
      />
    </Switch>
  </Router>
);

export default Routes;
