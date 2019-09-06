import React from 'react'
import { Route, Switch } from 'react-router-dom'

import UserEdit from './routes/UserEdit'
import UserList from './routes/UserList'
import UserNew from './routes/UserNew'

const routes = ({ match }) => (
  <Switch>
    <Route path={`${match.path}`} exact component={UserList} />
    <Route path={`${match.path}/new`} exact component={UserNew} />
    <Route path={`${match.path}/:userId`} exact component={UserEdit} />
  </Switch>
)

export default routes
