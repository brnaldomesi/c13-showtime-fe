import { GET_TAKEOVER, UPDATE_TAKEOVER } from './types'

import { apiCallSaga } from '../api'
import { takeLatest } from 'redux-saga/effects'

const getTakeover = apiCallSaga({
  type: GET_TAKEOVER,
  method: 'get',
  allowedParamKeys: [],
  path: '/takeover',
  selectorKey: 'takeover'
})

const updateTakeover = apiCallSaga({
  type: UPDATE_TAKEOVER,
  method: 'patch',
  allowedParamKeys: [],
  path: '/takeover',
  selectorKey: 'takeover'
})

export default function* rootSaga() {
  yield takeLatest(GET_TAKEOVER, getTakeover)
  yield takeLatest(UPDATE_TAKEOVER, updateTakeover)
}
