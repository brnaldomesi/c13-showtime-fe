import * as types from './types'

import { createAction } from 'redux-actions'

export const createNetwork = createAction(types.CREATE_NETWORK)

export const getNetworksList = createAction(types.GET_NETWORKS_LIST)

export const getNetworkDetails = createAction(types.GET_NETWORK_DETAILS)

export const updateNetwork = createAction(types.UPDATE_NETWORK)

export const getNetworkPodcastsList = createAction(types.GET_NETWORK_PODCASTS_LIST)

export const confirmAndDeleteNetwork = createAction(types.CONFIRM_AND_DELETE_NETWORK)
export const deleteNetwork = createAction(types.DELETE_NETWORK)
