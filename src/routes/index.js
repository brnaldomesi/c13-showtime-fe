import React from 'react'
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router-dom'

import AppContainer from 'components/AppContainer'
import Dashboard from './Dashboard'

const routes = ({ history }) => (
  <ConnectedRouter history={history}>
    <AppContainer>
      <Route exact path="/" component={Dashboard} />
    </AppContainer>
  </ConnectedRouter>
)

export default routes
