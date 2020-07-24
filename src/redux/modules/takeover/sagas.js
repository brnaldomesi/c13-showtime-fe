import { CONFIRM_AND_DELETE_IMG, GET_TAKEOVER, UPDATE_TAKEOVER } from './types'
import { call, put, race, takeLatest } from 'redux-saga/effects'

import { apiCallSaga } from '../api'
import { bindCallbackToPromise } from 'utils/helpers'
import { show } from 'redux-modal'

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

const confirmDelete = function*() {
  const confirmProm = bindCallbackToPromise()
  const cancelProm = bindCallbackToPromise()
  yield put(
    show('confirmModal', {
      onConfirm: confirmProm.cb,
      onCancel: cancelProm.cb,
      title: 'ARE YOU SURE YOU WANT TO DELETE?'
    })
  )
  const result = yield race({
    confirmed: call(confirmProm.promise),
    canceled: call(cancelProm.promise)
  })
  return Object.keys(result).includes('confirmed') ? true : false
}

const confirmAndDeleteImg = function*({ payload }) {
  const confirmed = yield call(confirmDelete)
  if (confirmed) {
    yield call(payload.success)
  }
}

export default function* rootSaga() {
  yield takeLatest(GET_TAKEOVER, getTakeover)
  yield takeLatest(UPDATE_TAKEOVER, updateTakeover)
  yield takeLatest(CONFIRM_AND_DELETE_IMG, confirmAndDeleteImg)
}
