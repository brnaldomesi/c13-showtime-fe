import React from 'react'
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router-dom'

import AppContainer from 'components/AppContainer'
import Dashboard from './Dashboard'
import MainLayout from 'components/MainLayout'

const routes = ({ history }) => (
  <ConnectedRouter history={history}>
    <AppContainer>
      <MainLayout>
        <Route exact path="/" component={Dashboard} />
      </MainLayout>
    </AppContainer>
  </ConnectedRouter>
)

export default routes
