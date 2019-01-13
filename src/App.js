import React, { Component } from 'react';
import { Route, Router, Switch, Redirect } from 'react-router-dom';
import { AccountPage } from './_containers/Account/AccountPage';
import { AuthenticatedUser } from './_containers/AuthenticatedUser/AuthenticatedUser';
import { NotFound } from './_components/';
import { Loader } from './_components';
import { history, appController } from './_helpers';
import { PAGE_SET } from './_constants';
import { PrivateRoute } from './_hocs';

class App extends Component {
  constructor(props) {
    super(props);
    // IMPROVEMENT: can use redux-persist
    appController.restoreUserData();
  }

  render() {
    return (
      <React.Fragment>
        <Loader />
        <main className="AppPageWrapper">
          <Router history={history}>
            <Switch>
              <PrivateRoute path={PAGE_SET.USER} component={AuthenticatedUser} />
              <Route path={PAGE_SET.ACCOUNT} component={AccountPage} />
              <Route exact path={PAGE_SET.MAIN_PAGE} render={() => <Redirect to={PAGE_SET.LOGIN} />} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
