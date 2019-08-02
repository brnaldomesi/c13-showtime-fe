import { dataSelector, isRequestPending } from '../api'
import { EMPTY_LIST_DATA } from 'config/constants'

export const networksListSelector = dataSelector('networksList', EMPTY_LIST_DATA)

export const networksListLoadingSelector = isRequestPending('networksList', 'get')

export const networkDetailsSelector = dataSelector('networkDetails', null)

export const networkDetailsLoadingSelector = isRequestPending('networkDetails', 'get')

export const networkPodcastsListSelector = dataSelector('networkPodcastsList', [])

export const networkPodcastsListLoadingSelector = isRequestPending('networkPodcastsList', 'get')
