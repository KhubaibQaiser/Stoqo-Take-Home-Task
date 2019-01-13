import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { PAGE_SET } from '../../_constants';
import { StorePage } from './StorePage/StorePage';

class AuthenticatedUser extends Component {

  render() {
    return (
      <React.Fragment>
        <Switch className="switch-wrapper">
          <Route path={PAGE_SET.STORES} component={StorePage} />
          <Route render={() => <Redirect to={PAGE_SET.NOT_FOUND} />} />
        </Switch>
      </React.Fragment>
    )
  }
}

export { AuthenticatedUser };
