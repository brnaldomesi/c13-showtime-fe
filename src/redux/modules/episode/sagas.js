import { takeLatest } from 'redux-saga/effects'

import { apiCallSaga } from '../api'
import { GET_EPISODE_DETAILS, GET_EPISODES_LIST, UPDATE_EPISODE_DETAILS } from './types'

const getEpisodesList = apiCallSaga({
  type: GET_EPISODES_LIST,
  method: 'get',
  allowedParamKeys: ['nextCursor', 'prevCursor', 'limit', 'sortOrder'],
  path: ({ payload }) => `/podcasts/${payload.podcastGuid}/episodes`,
  selectorKey: 'episodesList'
})

const getEpisodeDetails = apiCallSaga({
  type: GET_EPISODE_DETAILS,
  method: 'get',
  allowedParamKeys: [],
  path: ({ payload }) => `/episodes/${payload.guid}`,
  selectorKey: 'episodeDetails'
})

const updateEpisodeDetails = apiCallSaga({
  type: UPDATE_EPISODE_DETAILS,
  method: 'patch',
  allowedParamKeys: [],
  path: ({ payload }) => `/episodes/${payload.guid}`,
  selectorKey: 'episodeDetails'
})

export default function* rootSaga() {
  yield takeLatest(GET_EPISODES_LIST, getEpisodesList)
  yield takeLatest(GET_EPISODE_DETAILS, getEpisodeDetails)
  yield takeLatest(UPDATE_EPISODE_DETAILS, updateEpisodeDetails)
}
