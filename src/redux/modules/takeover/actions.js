import * as types from './types'

import { createAction } from 'redux-actions'

export const getTakeover = createAction(types.GET_TAKEOVER)
export const updateTakeover = createAction(types.UPDATE_TAKEOVER)
