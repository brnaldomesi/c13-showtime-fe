import { createAction } from 'redux-actions'

import * as types from './types'

export const authLogin = createAction(types.AUTH_LOGIN)

export const authLoginSuccess = createAction(types.AUTH_LOGIN_SUCCESS)

export const authLoginFail = createAction(types.AUTH_LOGIN_FAIL)
