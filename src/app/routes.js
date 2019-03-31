import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import HomePage from './modules/HomePage';

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>
    </Switch>
  </Router>
);
export default Routes;
