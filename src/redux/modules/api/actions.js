import { createAction } from 'redux-actions'

import * as types from './types'

export const requestPending = createAction(types.REQUEST_PENDING)
export const requestSuccess = createAction(types.REQUEST_SUCCESS)
export const requestRejected = createAction(types.REQUEST_REJECTED)
