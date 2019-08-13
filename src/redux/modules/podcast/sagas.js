import { takeLatest } from 'redux-saga/effects'

import { apiCallSaga } from '../api'
import {
  GET_PODCASTS_LIST,
  GET_PODCAST_DETAILS,
  UPDATE_PODCAST,
  UPDATE_PODCAST_DETAILS,
  UPLOAD_PODCAST_IMAGE,
  UPDATE_SUBSCRIPTION_URLS
} from './types'

const getPodcastsList = apiCallSaga({
  type: GET_PODCASTS_LIST,
  method: 'get',
  allowedParamKeys: ['nextCursor', 'prevCursor', 'limit', 'sortOrder'],
  path: '/podcasts',
  selectorKey: 'podcastsList'
})

const getPodcastDetails = apiCallSaga({
  type: GET_PODCAST_DETAILS,
  method: 'get',
  allowedParamKeys: [],
  path: ({ payload }) => `/podcasts/${payload.id}`,
  selectorKey: 'podcastDetails'
})

const updatePodcastApi = apiCallSaga({
  type: UPDATE_PODCAST,
  method: 'patch',
  allowedParamKeys: [],
  path: ({ payload }) => `/podcasts/${payload.id}`,
  selectorKey: 'podcastDetails'
})

const uploadPodcastImage = apiCallSaga({
  type: UPLOAD_PODCAST_IMAGE,
  method: 'post',
  allowedParamKeys: [],
  path: ({ payload }) => `/podcasts/${payload.id}/image`,
  selectorKey: 'podcastDetails.imageUrl'
})

const updateSubscriptionUrls = apiCallSaga({
  type: UPDATE_SUBSCRIPTION_URLS,
  method: 'patch',
  allowedParamKeys: [],
  path: ({ payload }) => `/podcasts/${payload.id}/subscription-urls`,
  selectorKey: 'podcastDetails.subscriptionUrls'
})

const updatePodcastDetails = function*(action) {
  const { payload } = action
  const { resolve, reject } = payload
  const { image, ...podcastData } = payload.data
  let result = yield updatePodcastApi({
    type: UPDATE_PODCAST,
    payload: {
      reject,
      guid: payload.guid,
      data: podcastData
    }
  })

  if (result && image) {
    const imageData = new FormData()
    imageData.append('image', image)

    result = yield uploadPodcastImage({
      type: UPLOAD_PODCAST_IMAGE,
      payload: {
        reject,
        data: imageData
      }
    })
  }

  if (resolve) {
    yield resolve()
  }

  return result
}

export default function* rootSaga() {
  yield takeLatest(GET_PODCASTS_LIST, getPodcastsList)
  yield takeLatest(GET_PODCAST_DETAILS, getPodcastDetails)
  yield takeLatest(UPDATE_PODCAST_DETAILS, updatePodcastDetails)
  yield takeLatest(UPLOAD_PODCAST_IMAGE, uploadPodcastImage)
  yield takeLatest(UPDATE_SUBSCRIPTION_URLS, updateSubscriptionUrls)
}
