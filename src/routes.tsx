import * as React from 'react';
import { SFC } from 'react';
import { Alert, PageHeader } from 'react-bootstrap';
import Loadable from 'react-loadable';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';

import { Loader } from './components/Spinner';

const NoMatch: SFC<RouteComponentProps<{}, {}>> = ({ location }) => (
  <PageHeader>
    <Alert bsStyle="warning" className="m-2">
      No match for <code>{location.pathname}</code>
    </Alert>
  </PageHeader>
);

export const Routes = () => (
  <div className="d-flex justify-content-center text-center">
    <Switch>
      <Route
        exact
        path="/"
        component={Loadable({
          loader: () => import('./components/UserList'),
          loading: Loader
        })}
      />
      <Route
        path="/user/:login"
        component={Loadable({
          loader: () => import('./components/User'),
          loading: Loader
        })}
      />
      <Route component={NoMatch} />
    </Switch>
  </div>
);
