import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router-dom'

import AppContainer from 'components/AppContainer'
import Dashboard from './Dashboard'
import Login from './Login'
import MainLayout from 'components/MainLayout'
import Networks from './Networks'
import PodcastDetails from './PodcastDetails'
import PodcastEdit from './PodcastEdit'
import PodcastEpisodes from './PodcastEpisodes'
import Podcasts from './Podcasts'

const routes = ({ history }) => (
  <ConnectedRouter history={history}>
    <AppContainer>
      <MainLayout>
        <Switch>
          <Route path="/networks" component={Networks} />
          <Route exact path="/podcasts" component={Podcasts} />
          <Route exact path="/podcasts/:podcastGuid" component={PodcastDetails} />
          <Route path="/podcasts/:podcastGuid/episodes" component={PodcastEpisodes} />
          <Route path="/podcasts/:podcastGuid/edit/:tabId?" component={PodcastEdit} />
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </MainLayout>
    </AppContainer>
  </ConnectedRouter>
)

export default routes
