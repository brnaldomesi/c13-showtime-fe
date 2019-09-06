import { createAction } from 'redux-actions'

import * as types from './types'

export const getUsersList = createAction(types.GET_USERS_LIST)

export const getUser = createAction(types.GET_USER)

export const createUser = createAction(types.CREATE_USER)

export const updateUser = createAction(types.UPDATE_USER)

export const deleteUser = createAction(types.DELETE_USER)

export const validateEmail = createAction(types.VALIDATE_EMAIL)

export const confirmAndDeleteUser = createAction(types.CONFIRM_AND_DELETE_USER)
