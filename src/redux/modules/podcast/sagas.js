import { takeLatest } from 'redux-saga/effects'

import { apiCallSaga } from '../api'
import {
  GET_PODCASTS_LIST
} from './types'

const getPodcastsList = apiCallSaga({
  type: GET_PODCASTS_LIST,
  method: 'get',
  allowedParamKeys: ['page', 'pageSize'],
  path: ({ payload }) => `/api/podcasts`,
  payloadOnSuccess: data => data.data,
  selectorKey: 'podcastsList'
})

export default function* rootSaga() {
  yield takeLatest(GET_PODCASTS_LIST, getPodcastsList)
}
