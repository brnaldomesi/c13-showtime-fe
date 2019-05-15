import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import api from './api'
import todo from './todo'

export default history =>
  combineReducers({
    api,
    todo,
    router: connectRouter(history),
  })
