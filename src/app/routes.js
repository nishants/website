import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

const Homepage = ()=> "welcome nishant !"
const Routes = () => (
  <Router>
    <Switch>
      <Route path="/" exact>
        <Homepage />
      </Route>
    </Switch>
  </Router>
);
export default Routes;
