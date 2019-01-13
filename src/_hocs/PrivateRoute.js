
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { PAGE_SET } from '../_constants';
import { appController } from '../_helpers';

// checks if user is loggedIn
// if yes allows user to see authenticated pages
// if no redirects to login page of the app

export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
      <Route {...rest} render={props => (
          (appController.isAuthenticated()) ?
              <Component {...props} /> :
              <Redirect to={{ pathname: PAGE_SET.LOGIN, state: { from: props.location } }} />
      )} />
  );
}
