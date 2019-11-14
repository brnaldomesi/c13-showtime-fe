import { put, select, takeLatest, throttle } from 'redux-saga/effects'

import { apiCallSaga } from '../api'
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_REFRESH_TOKEN, AUTH_TEST_TOKEN } from './types'
import { authLoginSuccess, authLoginFail, authRefreshTokenSuccess } from './actions'
import { saveData, loadData } from 'utils/storage'
import { TOKEN_FRESH_INTERVAL } from 'config/constants'
import { refreshTokenSelector } from './selectors'

const authLogin = apiCallSaga({
  type: AUTH_LOGIN,
  method: 'post',
  path: '/token/auth',
  selectorKey: 'authLogin',
  success: function*(payload) {
    saveData({ auth: payload })
    yield put(authLoginSuccess(payload))
  },
  fail: function*(payload) {
    yield put(authLoginFail(payload))
  }
})

const authRefreshTokenApi = apiCallSaga({
  type: AUTH_REFRESH_TOKEN,
  method: 'post',
  path: '/token/refresh',
  selectorKey: 'authRefreshToken',
  success: function*(payload) {
    const { auth } = loadData()
    saveData({
      auth: { ...auth, ...payload }
    })
    yield put(authRefreshTokenSuccess(payload))
  }
})

const authRefreshToken = function*(action) {
  const refreshToken = yield select(refreshTokenSelector)
  yield authRefreshTokenApi({
    payload: {
      headers: { 'X-CSRF-Token': refreshToken },
      data: { refresh_token: refreshToken }
    }
  })
}

const authLogout = function*(action) {
  yield saveData({ auth: null })
}

const authTestToken = apiCallSaga({
  type: AUTH_TEST_TOKEN,
  method: 'post',
  path: '/test',
  selectorKey: 'authTestToken'
})

export default function* rootSaga() {
  yield takeLatest(AUTH_LOGIN, authLogin)
  yield takeLatest(AUTH_LOGOUT, authLogout)
  yield takeLatest(AUTH_TEST_TOKEN, authTestToken)
  yield throttle(TOKEN_FRESH_INTERVAL, AUTH_REFRESH_TOKEN, authRefreshToken)
}
