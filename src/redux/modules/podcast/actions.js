import { createAction } from 'redux-actions'

import * as types from './types'

export const getPodcastsList = createAction(types.GET_PODCASTS_LIST)

export const getPodcastDetails = createAction(types.GET_PODCAST_DETAILS)

export const updatePodcastDetails = createAction(types.UPDATE_PODCAST_DETAILS)

export const uploadPodcastImage = createAction(types.UPLOAD_PODCAST_IMAGE)
