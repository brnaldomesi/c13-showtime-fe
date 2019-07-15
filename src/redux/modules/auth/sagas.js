import { put, takeLatest } from 'redux-saga/effects'

import { apiCallSaga } from '../api'
import {
  AUTH_LOGIN
} from './types'
import { authLoginSuccess, authLoginFail } from './actions'

const authLogin = apiCallSaga({
  type: AUTH_LOGIN,
  method: 'post',
  path: '/token/auth',
  selectorKey: 'todoList',
  success: function * (payload) {
    yield put(authLoginSuccess(payload))
  },
  fail:  function * (payload) {
    yield put(authLoginFail(payload))
  }
})

export default function* rootSaga() {
  yield takeLatest(AUTH_LOGIN, authLogin)
}
