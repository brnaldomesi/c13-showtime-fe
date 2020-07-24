import api from './api'
import auth from './auth'
import category from './category'
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { reducer as modal } from 'redux-modal'
import takeover from './takeover'
import todo from './todo'

export default history =>
  combineReducers({
    api,
    auth,
    todo,
    takeover,
    modal,
    category,
    router: connectRouter(history)
  })
