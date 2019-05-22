import { takeLatest } from 'redux-saga/effects'

import { apiCallSaga } from '../api'
import {
  GET_PODCASTS_LIST,
  GET_PODCAST_DETAILS,
  UPDATE_PODCAST_DETAILS,
} from './types'

const getPodcastsList = apiCallSaga({
  type: GET_PODCASTS_LIST,
  method: 'get',
  allowedParamKeys: ['page', 'pageSize'],
  path: '/api/podcasts',
  payloadOnSuccess: data => data.data,
  selectorKey: 'podcastsList'
})

const getPodcastDetails = apiCallSaga({
  type: GET_PODCAST_DETAILS,
  method: 'get',
  allowedParamKeys: [],
  path: ({ payload }) => `/api/podcasts/${payload.guid}`,
  payloadOnSuccess: data => data.data,
  selectorKey: 'podcastDetails'
})

const updatePodcastDetails = apiCallSaga({
  type: UPDATE_PODCAST_DETAILS,
  method: 'put',
  allowedParamKeys: [],
  path: ({ payload }) => `/api/podcasts/${payload.guid}`,
  payloadOnSuccess: data => data.data,
  selectorKey: 'podcastDetails'
})

export default function* rootSaga() {
  yield takeLatest(GET_PODCASTS_LIST, getPodcastsList)
  yield takeLatest(GET_PODCAST_DETAILS, getPodcastDetails)
  yield takeLatest(UPDATE_PODCAST_DETAILS, updatePodcastDetails)
}
