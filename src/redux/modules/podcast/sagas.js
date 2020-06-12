import {
  CONFIRM_AND_DELETE_FEATURED_PODCAST,
  CREATE_FEATURED_PODCAST,
  DELETE_FEATURED_PODCAST,
  GET_FEATURED_PODCASTS_LIST,
  GET_PODCASTS_LIST,
  GET_PODCAST_DETAILS,
  SEARCH_PODCASTS,
  UPDATE_FEATURED_PODCAST,
  UPDATE_PODCAST,
  UPDATE_PODCAST_CONFIG,
  UPDATE_PODCAST_DETAILS,
  UPDATE_SUBSCRIPTION_URLS,
  UPLOAD_PODCAST_IMAGE
} from './types'
import { call, put, race, takeLatest } from 'redux-saga/effects'

import { apiCallSaga } from '../api'
import { bindCallbackToPromise } from 'utils/helpers'
import { show } from 'redux-modal'

const getPodcastsList = apiCallSaga({
  type: GET_PODCASTS_LIST,
  method: 'get',
  allowedParamKeys: ['nextCursor', 'prevCursor', 'limit', 'sortOrder', 'search'],
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

const updatePodcast = apiCallSaga({
  type: UPDATE_PODCAST,
  method: 'patch',
  allowedParamKeys: [],
  path: ({ payload }) => `/podcasts/${payload.id}`,
  selectorKey: 'podcastDetails'
})

const updatePodcastConfig = apiCallSaga({
  type: UPDATE_PODCAST_CONFIG,
  method: 'patch',
  allowedParamKeys: [],
  path: ({ payload }) => `/podcasts/${payload.id}/config`,
  selectorKey: 'podcastDetails.config'
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
  const { image, config: podcastConfig, ...podcastData } = payload.data
  let result = yield updatePodcast({
    type: UPDATE_PODCAST,
    payload: {
      reject,
      id: payload.id,
      data: podcastData
    }
  })

  if (result) {
    result = yield updatePodcastConfig({
      type: UPDATE_PODCAST_CONFIG,
      payload: {
        reject,
        id: payload.id,
        data: podcastConfig
      }
    })
  }

  if (result && image) {
    const imageData = new FormData()
    imageData.append('image', image)

    result = yield uploadPodcastImage({
      type: UPLOAD_PODCAST_IMAGE,
      payload: {
        reject,
        id: payload.id,
        data: imageData
      }
    })
  }

  if (resolve) {
    yield resolve()
  }

  return result
}

const searchPodcasts = apiCallSaga({
  type: SEARCH_PODCASTS,
  method: 'get',
  allowedParamKeys: ['search'],
  path: '/podcasts/search',
  selectorKey: 'podcastsSearch'
})

const getFeaturedPodcastsList = apiCallSaga({
  type: GET_FEATURED_PODCASTS_LIST,
  method: 'get',
  allowedParamKeys: [],
  path: '/podcasts',
  selectorKey: 'featuredPodcastsList'
})

const createFeaturedPodcast = apiCallSaga({
  type: CREATE_FEATURED_PODCAST,
  method: 'post',
  allowedParamKeys: [],
  path: ({ payload }) => `/podcasts`,
  selectorKey: 'featuredPodcastDetails'
})

const updateFeaturedPodcast = apiCallSaga({
  type: UPDATE_FEATURED_PODCAST,
  method: 'patch',
  allowedParamKeys: [],
  path: ({ payload }) => `/podcasts/${payload.id}`,
  selectorKey: 'featuredPodcastDetails'
})

const deleteFeaturedPodcast = apiCallSaga({
  type: DELETE_FEATURED_PODCAST,
  method: 'delete',
  allowedParamKeys: [],
  path: ({ payload }) => `/podcasts/${payload.id}`,
  selectorKey: 'featuredPodcastDetails'
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

const confirmAndDeleteFeaturedPodcast = function*(action) {
  const confirmed = yield call(confirmDelete)
  if (confirmed) {
    yield call(deleteFeaturedPodcast, action)
  }
}

export default function* rootSaga() {
  yield takeLatest(GET_PODCASTS_LIST, getPodcastsList)
  yield takeLatest(GET_PODCAST_DETAILS, getPodcastDetails)
  yield takeLatest(UPDATE_PODCAST_DETAILS, updatePodcastDetails)
  yield takeLatest(UPDATE_PODCAST_CONFIG, updatePodcastConfig)
  yield takeLatest(UPLOAD_PODCAST_IMAGE, uploadPodcastImage)
  yield takeLatest(UPDATE_SUBSCRIPTION_URLS, updateSubscriptionUrls)
  yield takeLatest(SEARCH_PODCASTS, searchPodcasts)
  yield takeLatest(GET_FEATURED_PODCASTS_LIST, getFeaturedPodcastsList)
  yield takeLatest(CREATE_FEATURED_PODCAST, createFeaturedPodcast)
  yield takeLatest(UPDATE_FEATURED_PODCAST, updateFeaturedPodcast)
  yield takeLatest(DELETE_FEATURED_PODCAST, deleteFeaturedPodcast)
  yield takeLatest(CONFIRM_AND_DELETE_FEATURED_PODCAST, confirmAndDeleteFeaturedPodcast)
}
