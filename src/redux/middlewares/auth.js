import get from 'lodash/get'

import { AUTH_LOGOUT } from 'redux/modules/auth'
import { REQUEST_REJECTED } from 'redux/modules/api'

const authMiddleware = store => next => action => {
  if (action.type === REQUEST_REJECTED) {
    const status = get(action, 'payload.data.status')
    if (status === 401) {
      store.dispatch({
        type: AUTH_LOGOUT
      })
      return
    }
  }

  return next(action)
}

export default authMiddleware
