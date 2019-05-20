import { dataSelector } from '../api'
import { EMPTY_LIST_DATA } from 'config/constants'

export const podcastsListSelector = dataSelector('podcastsList', EMPTY_LIST_DATA)
