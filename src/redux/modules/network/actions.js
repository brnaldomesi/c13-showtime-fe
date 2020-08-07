import * as types from './types'

import { createAction } from 'redux-actions'

export const createNetwork = createAction(types.CREATE_NETWORK)

export const getNetworksList = createAction(types.GET_NETWORKS_LIST)

export const getNetworkDetails = createAction(types.GET_NETWORK_DETAILS)

export const updateNetwork = createAction(types.UPDATE_NETWORK)

export const getNetworkPodcastsList = createAction(types.GET_NETWORK_PODCASTS_LIST)

export const updateNetworkPodcasts = createAction(types.UPDATE_NETWORK_PODCASTS)
