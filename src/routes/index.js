import { Route, Switch } from 'react-router-dom'

import AppContainer from 'components/AppContainer'
import ConfirmModal from 'components/ConfirmModal'
import { ConnectedRouter } from 'connected-react-router'
import Dashboard from './Dashboard'
import Login from './Login'
import MainLayout from 'components/MainLayout'
import Networks from './Networks'
import PodcastDetails from './PodcastDetails'
import PodcastPreview from './PodcastPreview'
import Podcasts from './Podcasts'
import React from 'react'
import TokenMonitor from 'components/TokenMonitor'
import Users from './Users'

const routes = ({ history }) => (
  <ConnectedRouter history={history}>
    <AppContainer>
      <MainLayout>
        <TokenMonitor />
        <Switch>
          <Route path="/networks" component={Networks} />
          <Route path="/podcasts" exact component={Podcasts} />
          <Route path="/podcasts/:podcastId/preview" exact component={PodcastPreview} />
          <Route path="/podcasts/:podcastId/:tabId/:instanceId" component={PodcastDetails} />
          <Route path="/podcasts/:podcastId/:tabId?" component={PodcastDetails} />
          <Route path="/users" component={Users} />
          <Route path="/" exact component={Dashboard} />
          <Route path="/login" exact component={Login} />
        </Switch>
        <ConfirmModal />
      </MainLayout>
    </AppContainer>
  </ConnectedRouter>
)

export default routes
