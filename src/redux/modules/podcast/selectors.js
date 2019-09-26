import { dataSelector, isRequestPending } from '../api'
import { EMPTY_LIST_DATA } from 'config/constants'

export const podcastsListSelector = dataSelector('podcastsList', EMPTY_LIST_DATA)

export const podcastsListLoadingSelector = isRequestPending('podcastsList', 'get')

export const podcastDetailsSelector = dataSelector('podcastDetails', null)

export const podcastDetailsLoadingSelector = isRequestPending('podcastDetails', 'get')

export const podcastsSearchResultsSelector = dataSelector('podcastsSearch', [])
