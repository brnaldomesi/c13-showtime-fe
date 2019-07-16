import { put, takeLatest } from 'redux-saga/effects'

import { apiCallSaga } from '../api'
import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
} from './types'
import { authLoginSuccess, authLoginFail } from './actions'
import { saveData } from 'utils/storage'

const authLogin = apiCallSaga({
  type: AUTH_LOGIN,
  method: 'post',
  path: '/token/auth',
  selectorKey: 'authLogin',
  success: function * (payload) {
    saveData({ auth: payload });
    yield put(authLoginSuccess(payload))
  },
  fail:  function * (payload) {
    yield put(authLoginFail(payload))
  }
})

const authLogout = function* (action) {
  yield saveData({ auth: null })
}

export default function* rootSaga() {
  yield takeLatest(AUTH_LOGIN, authLogin)
  yield takeLatest(AUTH_LOGOUT, authLogout)
}
