import { handleActions } from 'redux-actions'
import get from 'lodash/get'

import * as types from './types'
import { loadData } from 'utils/storage'

const getInitialState = () => {
  const { auth } = loadData()
  return {
    isAuthenticated: Boolean(get(auth, 'accessCsrf') && get(auth, 'refreshCsrf')),
    accessCsrf: get(auth, 'accessCsrf') || null,
    refreshCsrf: get(auth, 'refreshCsrf') || null,
  }
}

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
    }),
    [types.AUTH_LOGOUT]: (state, { payload }) => ({
      ...state,
      isAuthenticated: false,
      accessCsrf: null,
      refreshCsrf: null
    }),
  },
  getInitialState()
)
