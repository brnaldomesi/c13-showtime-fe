import { isRequestPending } from '../api'
import fp from 'lodash/fp'

export const isAuthenticatedSelector = fp.get('auth.isAuthenticated')

export const isAuthenticatingSelector = (state) =>
  isRequestPending('authLogin', 'post')(state) && !isAuthenticatedSelector(state)

export const tokenSelector = fp.get('auth.accessCsrf')
