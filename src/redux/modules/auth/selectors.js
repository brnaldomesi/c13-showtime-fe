import { isRequestPending } from '../api'
import { createSelector } from 'reselect'
import fp from 'lodash/fp'

export const authSelector = fp.get('auth')

export const isAuthenticatedSelector = createSelector(
  authSelector,
  fp.get('isAuthenticated')
)

export const isAuthenticatingSelector = state =>
  isRequestPending('authLogin', 'post')(state) && !isAuthenticatedSelector(state)

export const tokenSelector = createSelector(
  authSelector,
  fp.get('accessCsrf')
)

export const refreshTokenSelector = createSelector(
  authSelector,
  fp.get('refreshCsrf')
)
