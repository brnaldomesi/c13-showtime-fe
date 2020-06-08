import * as types from './types'

import { createAction } from 'redux-actions'

export const getPodcastsList = createAction(types.GET_PODCASTS_LIST)

export const getPodcastDetails = createAction(types.GET_PODCAST_DETAILS)

export const updatePodcastDetails = createAction(types.UPDATE_PODCAST_DETAILS)

export const uploadPodcastImage = createAction(types.UPLOAD_PODCAST_IMAGE)

export const updateSubscriptionUrls = createAction(types.UPDATE_SUBSCRIPTION_URLS)

export const getPodcastConfig = createAction(types.GET_PODCAST_CONFIG)

export const updatePodcastConfig = createAction(types.UPDATE_PODCAST_CONFIG)

export const searchPodcasts = createAction(types.SEARCH_PODCASTS)

export const getFeaturedPodcastsList = createAction(types.GET_FEATURED_PODCASTS_LIST)

export const updateFeaturedPodcast = createAction(types.UPDATE_FEATURED_PODCAST)
