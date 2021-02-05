/* eslint-disable no-unused-vars */
import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import HomePage from './app/pages/Home';
import RegisterPage from './app/pages/Register';
import LoginPage from './app/pages/Login';
import { AuthContext } from './auth';

const App = () => {
  const { authState } = React.useContext(AuthContext);
  const isAuth = authState?.status === 'in';

  // UNPROTECTED ROUTES
  if (!isAuth) {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <HomePage />}
          />
          <Route
            path="/login"
            render={() => <LoginPage />}
          />
          <Route
            path="/register"
            render={() => <RegisterPage />}
          />
          <Redirect to="/" />
        </Switch>
      </Router>
    );
  }

  // PROTECTED ROUTES
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <HomePage />} />
        <Route path="/login" render={() => <LoginPage />} />
        <Route
          path="/register"
          render={() => <RegisterPage />}
        />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
