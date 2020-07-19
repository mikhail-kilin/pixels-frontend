import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Main from 'containers/main';
import Info from 'components/info';
import Profile from 'containers/profile';
import { routes } from 'helpers/routes';

const ApplicationRoutes = () => (
  <Switch>
    <Route
      exact
      path={routes.home}
      component={Main}
    />
    <Route path={routes.info} component={Info} />
    <Route path={routes.profile} component={Profile} />
    <Redirect to={routes.home} />
  </Switch>
);

export default ApplicationRoutes;
