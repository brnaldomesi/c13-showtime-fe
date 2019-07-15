import { handleActions } from 'redux-actions'
import * as types from './types'

export default handleActions(
  {
    [types.AUTH_LOGIN_SUCCESS]: (state, { payload }) => ({
      ...state,
      isAuthenticated: true,
      accessCsrf: payload.accessCsrf,
      refreshCsrf: payload.refreshCsrf
    }),
    [types.AUTH_LOGIN_FAIL]: (state, { payload }) => ({
      ...state,
      isAuthenticated: false,
      accessCsrf: null,
      refreshCsrf: null
    })
  },
  {
    isAuthenticated: false,
    accessCsrf: null,
    refreshCsrf: null
  }
)
