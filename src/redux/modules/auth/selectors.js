import fp from 'lodash/fp'

export const isAuthenticatedSelector = fp.get('auth.isAuthenticated')

export const tokenSelector = fp.get('auth.accessCsrf')
