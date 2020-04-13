import { Route, Switch } from 'react-router-dom'

import NetworkDetails from './routes/NetworkDetails'
import NetworkEdit from './routes/NetworkEdit'
import NetworkList from './routes/NetworkList'
import NetworkNew from './routes/NetworkNew'
import React from 'react'
import { userIsAuthenticatedRedir } from 'hocs/withAuth'

const routes = ({ match }) => (
  <Switch>
    <Route path={`${match.path}`} exact component={NetworkList} />
    <Route path={`${match.path}/new`} exact component={NetworkNew} />
    <Route path={`${match.path}/:networkId`} exact component={NetworkDetails} />
    <Route path={`${match.path}/:networkId/edit`} exact component={NetworkEdit} />
    <Route path={`${match.path}/:networkId/podcasts`} exact component={NetworkDetails} />
  </Switch>
)

export default userIsAuthenticatedRedir(routes)
