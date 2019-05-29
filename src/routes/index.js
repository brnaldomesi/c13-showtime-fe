import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router-dom'

import AppContainer from 'components/AppContainer'
import Dashboard from './Dashboard'
import PodcastEdit from './PodcastEdit'
import Podcasts from './Podcasts'
import MainLayout from 'components/MainLayout'

const routes = ({ history }) => (
  <ConnectedRouter history={history}>
    <AppContainer>
      <MainLayout>
        <Switch>
          <Route exact path="/podcasts" component={Podcasts} />
          <Route exact path="/podcasts/:podcastGuid/:tabId?" component={PodcastEdit} />
          <Route exact path="/" component={Dashboard} />
        </Switch>
      </MainLayout>
    </AppContainer>
  </ConnectedRouter>
)

export default routes
