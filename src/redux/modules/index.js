import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { reducer as modal } from 'redux-modal'

import api from './api'
import auth from './auth'
import todo from './todo'

export default history =>
  combineReducers({
    api,
    auth,
    todo,
    modal,
    router: connectRouter(history)
  })
