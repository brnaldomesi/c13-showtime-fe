import { takeLatest } from 'redux-saga/effects'

import { apiCallSaga } from '../api'
import {
  GET_TODO_LIST_API
} from './types'

const getTodoList = apiCallSaga({
  type: GET_TODO_LIST_API,
  method: 'get',
  allowedParamKeys: ['todo', 'date'],
  path: ({ payload }) => `/api/todoList`,
  payloadOnSuccess: data => data.data,
  selectorKey: 'todoList'
})

export default function* rootSaga() {
  yield takeLatest(GET_TODO_LIST_API, getTodoList)
}
