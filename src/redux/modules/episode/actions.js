import { createAction } from 'redux-actions'

import * as types from './types'

export const getEpisodesList = createAction(types.GET_EPISODES_LIST)

export const getEpisodeDetails = createAction(types.GET_EPISODE_DETAILS)

export const updateEpisodeDetails = createAction(types.UPDATE_EPISODE_DETAILS)
