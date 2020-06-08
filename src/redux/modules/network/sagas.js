import {
  CREATE_NETWORK,
  GET_NETWORKS_LIST,
  GET_NETWORK_DETAILS,
  GET_NETWORK_PODCASTS_LIST,
  UPDATE_NETWORK
} from './types'

import { apiCallSaga } from '../api'
import { takeLatest } from 'redux-saga/effects'

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

export default function* rootSaga() {
  yield takeLatest(CREATE_NETWORK, createNetwork)
  yield takeLatest(GET_NETWORKS_LIST, getNetworksList)
  yield takeLatest(GET_NETWORK_DETAILS, getNetworkDetails)
  yield takeLatest(UPDATE_NETWORK, updateNetwork)
  yield takeLatest(GET_NETWORK_PODCASTS_LIST, getNetworkPodcastsList)
}
