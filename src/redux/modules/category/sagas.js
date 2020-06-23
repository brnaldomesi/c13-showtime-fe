import {
  CONFIRM_AND_DELETE_FEATURED_PODCAST,
  CREATE_FEATURED_PODCAST,
  DELETE_FEATURED_PODCAST,
  GET_FEATURED_PODCASTS_LIST,
  UPDATE_CATEGORIES,
  UPDATE_FEATURED_PODCAST
} from './types'
import { call, put, race, takeLatest } from 'redux-saga/effects'
import {
  createCategorySuccess,
  deleteCategorySuccess,
  getCategoriesListFail,
  getCategoriesListSuccess,
  updateCategoriesPrioritySuccess,
  updateCategorySuccess
} from './actions'

import { apiCallSaga } from '../api'
import { bindCallbackToPromise } from 'utils/helpers'
import { show } from 'redux-modal'

const getFeaturedPodcastsList = apiCallSaga({
  type: GET_FEATURED_PODCASTS_LIST,
  method: 'get',
  allowedParamKeys: [],
  path: '/categories',
  selectorKey: 'featuredPodcastsList',
  success: function*(payload) {
    yield put(getCategoriesListSuccess(payload))
  },
  fail: function*(payload) {
    yield put(getCategoriesListFail(payload))
  }
})

const createFeaturedPodcast = apiCallSaga({
  type: CREATE_FEATURED_PODCAST,
  method: 'post',
  allowedParamKeys: [],
  path: ({ payload }) => `/categories`,
  selectorKey: 'featuredPodcastDetails',
  success: function*(payload) {
    yield put(createCategorySuccess(payload))
  }
})

const updateFeaturedPodcast = apiCallSaga({
  type: UPDATE_FEATURED_PODCAST,
  method: 'patch',
  allowedParamKeys: [],
  path: ({ payload }) => `/categories/${payload.id}`,
  selectorKey: 'featuredPodcastDetails',
  success: function*(payload) {
    yield put(updateCategorySuccess(payload))
  }
})

const deleteFeaturedPodcast = apiCallSaga({
  type: DELETE_FEATURED_PODCAST,
  method: 'delete',
  allowedParamKeys: [],
  path: ({ payload }) => `/categories/${payload.id}`,
  selectorKey: 'featuredPodcastDetails',
  success: function*(payload, action) {
    yield put(deleteCategorySuccess(action))
  }
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

const updateCategories = apiCallSaga({
  type: UPDATE_CATEGORIES,
  method: 'patch',
  allowedParamKeys: [],
  path: ({ payload }) => `/categories`,
  selectorKey: 'featuredPodcastsList',
  success: function*(payload) {
    yield put(updateCategoriesPrioritySuccess(payload))
  }
})

export default function* rootSaga() {
  yield takeLatest(GET_FEATURED_PODCASTS_LIST, getFeaturedPodcastsList)
  yield takeLatest(CREATE_FEATURED_PODCAST, createFeaturedPodcast)
  yield takeLatest(UPDATE_FEATURED_PODCAST, updateFeaturedPodcast)
  yield takeLatest(DELETE_FEATURED_PODCAST, deleteFeaturedPodcast)
  yield takeLatest(CONFIRM_AND_DELETE_FEATURED_PODCAST, confirmAndDeleteFeaturedPodcast)
  yield takeLatest(UPDATE_CATEGORIES, updateCategories)
}
