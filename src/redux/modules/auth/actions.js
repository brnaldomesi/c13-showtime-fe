import { createAction } from 'redux-actions'

import * as types from './types'

export const authLogin = createAction(types.AUTH_LOGIN)

export const authLoginSuccess = createAction(types.AUTH_LOGIN_SUCCESS)

export const authLoginFail = createAction(types.AUTH_LOGIN_FAIL)

export const authLogout = createAction(types.AUTH_LOGOUT)

export const authRefreshToken = createAction(types.AUTH_REFRESH_TOKEN)

export const authRefreshTokenSuccess = createAction(types.AUTH_REFRESH_TOKEN_SUCCESS)
