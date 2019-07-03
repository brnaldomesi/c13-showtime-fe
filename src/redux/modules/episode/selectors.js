import { dataSelector, isRequestPending } from '../api'
import { EMPTY_LIST_DATA } from 'config/constants'

export const episodesListSelector = dataSelector('episodesList', EMPTY_LIST_DATA)

export const episodeDetailsSelector = dataSelector('episodeDetails', null)

export const episodesListLoadingSelector = isRequestPending('episodesList', 'get')
