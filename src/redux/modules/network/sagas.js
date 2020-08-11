import {
  CONFIRM_AND_DELETE_NETWORK,
  CREATE_NETWORK,
  DELETE_NETWORK,
  GET_NETWORKS_LIST,
  GET_NETWORK_DETAILS,
  GET_NETWORK_PODCASTS_LIST,
  UPDATE_NETWORK,
  UPDATE_NETWORK_PODCASTS
} from './types'
import { call, put, race, takeLatest } from 'redux-saga/effects'

import { apiCallSaga } from '../api'
import { bindCallbackToPromise } from 'utils/helpers'
import { show } from 'redux-modal'

const createNetwork = apiCallSaga({
  type: CREATE_NETWORK,
  method: 'post',
  allowedParamKeys: [],
  path: ({ payload }) => `/networks`,
  selectorKey: 'createdNetwork'
})

const getNetworksList = apiCallSaga({
  type: GET_NETWORKS_LIST,
  method: 'get',
  allowedParamKeys: ['nextCursor', 'prevCursor', 'limit'],
  path: '/networks',
  selectorKey: 'networksList'
})

const getNetworkDetails = apiCallSaga({
  type: GET_NETWORK_DETAILS,
  method: 'get',
  allowedParamKeys: [],
  path: ({ payload }) => `/networks/${payload.id}`,
  selectorKey: 'networkDetails'
})

const updateNetwork = apiCallSaga({
  type: UPDATE_NETWORK,
  method: 'patch',
  allowedParamKeys: [],
  path: ({ payload }) => `/networks/${payload.id}`,
  selectorKey: 'networkDetails'
})

const getNetworkPodcastsList = apiCallSaga({
  type: GET_NETWORK_PODCASTS_LIST,
  method: 'get',
  allowedParamKeys: [],
  path: ({ payload }) => `/networks/${payload.networkId}/podcasts`,
  selectorKey: 'networkPodcastsList'
})

const updateNetworkPodcasts = apiCallSaga({
  type: UPDATE_NETWORK_PODCASTS,
  method: 'patch',
  allowedParamKeys: [],
  path: ({ payload }) => `/networks/${payload.networkId}/podcasts`,
  selectorKey: 'networkPodcastsList'
})

const deleteNetwork = apiCallSaga({
  type: DELETE_NETWORK,
  method: 'delete',
  allowedParamKeys: [],
  path: ({ payload }) => `/networks/${payload.id}`,
  selectorKey: 'networksList'
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

const confirmAndDeleteNetwork = function*(action) {
  const confirmed = yield call(confirmDelete)
  if (confirmed) {
    yield call(deleteNetwork, action)
  }
}

export default function* rootSaga() {
  yield takeLatest(CREATE_NETWORK, createNetwork)
  yield takeLatest(GET_NETWORKS_LIST, getNetworksList)
  yield takeLatest(GET_NETWORK_DETAILS, getNetworkDetails)
  yield takeLatest(UPDATE_NETWORK, updateNetwork)
  yield takeLatest(GET_NETWORK_PODCASTS_LIST, getNetworkPodcastsList)
  yield takeLatest(UPDATE_NETWORK_PODCASTS, updateNetworkPodcasts)
  yield takeLatest(CONFIRM_AND_DELETE_NETWORK, confirmAndDeleteNetwork)
  yield takeLatest(DELETE_NETWORK, deleteNetwork)
}
