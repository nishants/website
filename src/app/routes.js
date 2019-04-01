import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import HomePage from './modules/HomePage';

const Routes = () => (
  <Router>
    <Route path="/:tab_id">
      <HomePage />
    </Route>
  </Router>
);
export default Routes;
