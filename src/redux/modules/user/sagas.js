import { call, race, put, takeLatest } from 'redux-saga/effects'

import { apiCallSaga } from '../api'
import {
  GET_USER,
  GET_USERS_LIST,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  VALIDATE_EMAIL,
  CONFIRM_AND_DELETE_USER
} from './types'
import { bindCallbackToPromise } from 'utils/helpers'
import { show } from 'redux-modal'

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
  method: 'post',
  allowedParamKeys: [],
  path: '/users/validate-email',
  selectorKey: 'user'
})

const confirmDelete = function*() {
  const confirmProm = bindCallbackToPromise()
  const cancelProm = bindCallbackToPromise()
  yield put(
    show('confirmModal', {
      onConfirm: confirmProm.cb,
      onCancel: cancelProm.cb,
      title: 'Are you sure you want to delete this user?'
    })
  )
  const result = yield race({
    confirmed: call(confirmProm.promise),
    canceled: call(cancelProm.promise)
  })
  return Object.keys(result).includes('confirmed') ? true : false
}

const confirmAndDeleteUser = function*(action) {
  const confirmed = yield call(confirmDelete)
  if (confirmed) {
    yield call(deleteUser, action)
  }
}

export default function* rootSaga() {
  yield takeLatest(GET_USERS_LIST, getUsersList)
  yield takeLatest(GET_USER, getUser)
  yield takeLatest(CREATE_USER, createUser)
  yield takeLatest(UPDATE_USER, updateUser)
  yield takeLatest(DELETE_USER, deleteUser)
  yield takeLatest(VALIDATE_EMAIL, validateEmail)
  yield takeLatest(CONFIRM_AND_DELETE_USER, confirmAndDeleteUser)
}
