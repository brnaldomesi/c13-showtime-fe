import * as types from './types'

import { createAction } from 'redux-actions'

export const getFeaturedPodcastsList = createAction(types.GET_FEATURED_PODCASTS_LIST)
export const getCategoriesListSuccess = createAction(types.GET_CATEGORIES_LIST_SUCCESS)
export const getCategoriesListFail = createAction(types.GET_CATEGORIES_LIST_FAIL)

export const createFeaturedPodcast = createAction(types.CREATE_FEATURED_PODCAST)
export const createCategorySuccess = createAction(types.CREATE_CATEGORY_SUCCESS)

export const updateFeaturedPodcast = createAction(types.UPDATE_FEATURED_PODCAST)
export const updateCategorySuccess = createAction(types.UPDATE_CATEGORY_SUCCESS)

export const deleteFeaturedPodcast = createAction(types.DELETE_FEATURED_PODCAST)
export const deleteCategorySuccess = createAction(types.DELETE_CATEGORY_SUCCESS)

export const confirmAndDeleteFeaturedPodcast = createAction(types.CONFIRM_AND_DELETE_FEATURED_PODCAST)

export const updateCategories = createAction(types.UPDATE_CATEGORIES)
export const updateCategoriesPrioritySuccess = createAction(types.UPDATE_CATEGORIES_PRIORITY_SUCCESS)
