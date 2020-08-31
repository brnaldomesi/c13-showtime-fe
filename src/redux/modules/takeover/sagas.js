import { CONFIRM_AND_DELETE_IMG, GET_TAKEOVER, PRESIGNED_POST, UPDATE_TAKEOVER, UPLAOD_TO_S3 } from './types'
import { call, put, race, takeEvery, takeLatest } from 'redux-saga/effects'

import { apiCallSaga } from '../api'
import { bindCallbackToPromise } from 'utils/helpers'
import { show } from 'redux-modal'

const getTakeover = apiCallSaga({
  type: GET_TAKEOVER,
  method: 'get',
  allowedParamKeys: [],
  path: '/show-hub/config',
  selectorKey: 'takeover'
})

const presignedPost = apiCallSaga({
  type: PRESIGNED_POST,
  method: 'post',
  allowedParamKeys: [],
  path: '/show-hub/presigned-post',
  selectorKey: 'presignedPost'
})

const uploadToS3 = apiCallSaga({
  type: UPLAOD_TO_S3,
  method: 'post',
  allowedParamKeys: [],
  withCredential: false,
  path: ({ payload }) => payload.path,
  selectorKey: 's3'
})

const updateTakeover = apiCallSaga({
  type: UPDATE_TAKEOVER,
  method: 'patch',
  allowedParamKeys: [],
  path: '/show-hub/config',
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
  yield takeEvery(PRESIGNED_POST, presignedPost)
  yield takeEvery(UPLAOD_TO_S3, uploadToS3)
  yield takeLatest(UPDATE_TAKEOVER, updateTakeover)
  yield takeLatest(CONFIRM_AND_DELETE_IMG, confirmAndDeleteImg)
}
