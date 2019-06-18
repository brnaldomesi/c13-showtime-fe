import { put, takeLatest } from 'redux-saga/effects'

import {
  apiCallSaga,
  requestPending,
  requestRejected,
  requestSuccess,
} from '../api'
import {
  GET_PODCASTS_LIST,
  GET_PODCAST_DETAILS,
  UPDATE_PODCAST,
  UPDATE_PODCAST_DETAILS,
  UPLOAD_PODCAST_IMAGE,
} from './types'

const getPodcastsList = apiCallSaga({
  type: GET_PODCASTS_LIST,
  method: 'get',
  allowedParamKeys: ['startAfter', 'endingBefore', 'limit'],
  path: '/podcasts',
  selectorKey: 'podcastsList'
})

const getPodcastDetails = apiCallSaga({
  type: GET_PODCAST_DETAILS,
  method: 'get',
  allowedParamKeys: [],
  path: ({ payload }) => `/podcasts/${payload.guid}`,
  selectorKey: 'podcastDetails'
})

const updatePodcastApi = apiCallSaga({
  type: UPDATE_PODCAST,
  method: 'put',
  allowedParamKeys: [],
  path: ({ payload }) => `/podcasts/${payload.guid}`,
  payloadOnSuccess: data => data.data,
  selectorKey: 'podcastDetails'
})

const uploadPodcastImage = apiCallSaga({
  type: UPLOAD_PODCAST_IMAGE,
  method: 'post',
  allowedParamKeys: [],
  path: ({ payload }) => `/podcasts/${payload.guid}/image`,
  payloadOnSuccess: data => data.data,
  selectorKey: 'podcastDetails.imageUrl'
})

const updatePodcastDetails = function* (action) {
  const { payload } = action
  const { image, ...podcastData } = payload.data
  yield put({ type: requestPending(UPDATE_PODCAST_DETAILS) })
  let result = yield updatePodcastApi({
    type: UPDATE_PODCAST,
    payload: { data: podcastData }
  })

  if (result && image) {
    const imageData = new FormData()
    imageData.append('image', image)

    result = yield uploadPodcastImage({
      type: UPLOAD_PODCAST_IMAGE,
      payload: { data: imageData }
    })
  }

  if (result) {
    yield put({ type: requestSuccess(UPDATE_PODCAST_DETAILS) })
  } else {
    yield put({ type: requestRejected(UPDATE_PODCAST_DETAILS) })
  }
}

export default function* rootSaga() {
  yield takeLatest(GET_PODCASTS_LIST, getPodcastsList)
  yield takeLatest(GET_PODCAST_DETAILS, getPodcastDetails)
  yield takeLatest(UPDATE_PODCAST_DETAILS, updatePodcastDetails)
  yield takeLatest(UPLOAD_PODCAST_IMAGE, uploadPodcastImage)
}
