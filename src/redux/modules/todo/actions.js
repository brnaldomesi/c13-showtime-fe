import { createAction } from 'redux-actions'

import * as types from './types'

export const getTodoListApi = createAction(types.GET_TODO_LIST_API)

export const todoAction = createAction(types.TODO_ACTION)
