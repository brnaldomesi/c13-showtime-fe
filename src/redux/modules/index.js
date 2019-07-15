import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import api from './api'
import auth from './auth'
import todo from './todo'

export default history =>
  combineReducers({
    api,
    auth,
    todo,
    router: connectRouter(history),
  })
