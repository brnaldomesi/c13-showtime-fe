import { createAction } from 'redux-actions'

import * as types from './types'

export const createNetwork = createAction(types.CREATE_NETWORK)

export const getNetworksList = createAction(types.GET_NETWORKS_LIST)

export const getNetworkDetails = createAction(types.GET_NETWORK_DETAILS)

export const updateNetwork = createAction(types.UPDATE_NETWORK)
