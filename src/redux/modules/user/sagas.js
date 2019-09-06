import { takeLatest } from 'redux-saga/effects'

import { apiCallSaga } from '../api'
import { GET_USER, GET_USERS_LIST, CREATE_USER, UPDATE_USER, DELETE_USER, VALIDATE_EMAIL } from './types'

const getUsersList = apiCallSaga({
  type: GET_USERS_LIST,
  method: 'get',
  allowedParamKeys: ['nextCursor', 'prevCursor', 'limit'],
  path: '/users',
  selectorKey: 'usersList'
})

const createUser = apiCallSaga({
  type: CREATE_USER,
  method: 'post',
  allowedParamKeys: [],
  path: '/users',
  selectorKey: 'user'
})

const getUser = apiCallSaga({
  type: GET_USER,
  method: 'get',
  allowedParamKeys: [],
  path: ({ payload }) => `/users/${payload.id}`,
  selectorKey: 'user'
})

const updateUser = apiCallSaga({
  type: UPDATE_USER,
  method: 'patch',
  allowedParamKeys: [],
  path: ({ payload }) => `/users/${payload.id}`,
  payloadOnSuccess: (data, payload) => payload.data,
  selectorKey: 'user'
})

const deleteUser = apiCallSaga({
  type: DELETE_USER,
  method: 'delete',
  allowedParamKeys: [],
  path: ({ payload }) => `/users/${payload.id}`,
  selectorKey: 'user'
})

const validateEmail = apiCallSaga({
  type: VALIDATE_EMAIL,
  method: 'delete',
  allowedParamKeys: [],
  path: '/users/validate-email',
  selectorKey: 'user'
})

export default function* rootSaga() {
  yield takeLatest(GET_USERS_LIST, getUsersList)
  yield takeLatest(GET_USER, getUser)
  yield takeLatest(CREATE_USER, createUser)
  yield takeLatest(UPDATE_USER, updateUser)
  yield takeLatest(DELETE_USER, deleteUser)
  yield takeLatest(VALIDATE_EMAIL, validateEmail)
}
