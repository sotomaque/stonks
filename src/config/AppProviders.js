// @ts-nocheck
import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import AuthProvider from './auth';
import store, { persistor } from './configureStore';
import client from '../gql/client';
import GlobalStyle from '../styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { darkTheme } from '../styles/theme';

function AppProviders({ children }) {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthProvider>
            <Router>
              <ThemeProvider theme={darkTheme}>
                <GlobalStyle />
                {children}
              </ThemeProvider>
            </Router>
          </AuthProvider>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
}

export default AppProviders;
