import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router-dom'

import AppContainer from 'components/AppContainer'
import Dashboard from './Dashboard'
import Login from './Login'
import MainLayout from 'components/MainLayout'
import NetworkDetails from './NetworkDetails'
import Networks from './Networks'
import PodcastDetails from './PodcastDetails'
import PodcastPreview from './PodcastPreview'
import Podcasts from './Podcasts'
import TokenMonitor from 'components/TokenMonitor'

const routes = ({ history }) => (
  <ConnectedRouter history={history}>
    <AppContainer>
      <MainLayout>
        <TokenMonitor />
        <Switch>
          <Route path="/networks" exact component={Networks} />
          <Route path="/networks/:networkId" exact component={NetworkDetails} />
          <Route path="/podcasts" exact component={Podcasts} />
          <Route path="/podcasts/:podcastId/preview" exact component={PodcastPreview} />
          <Route path="/podcasts/:podcastId/:tabId/:crewId" component={PodcastDetails} />
          <Route path="/podcasts/:podcastId/:tabId?" component={PodcastDetails} />
          <Route path="/" exact component={Dashboard} />
          <Route path="/login" exact component={Login} />
        </Switch>
      </MainLayout>
    </AppContainer>
  </ConnectedRouter>
)

export default routes
