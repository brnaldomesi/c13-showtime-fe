import { dataSelector, isRequestPending } from '../api'

export const networksListSelector = dataSelector('networksList', [])

export const networksListLoadingSelector = isRequestPending('networksList', 'get')

export const networkDetailsSelector = dataSelector('networkDetails', null)

export const networkDetailsLoadingSelector = isRequestPending('networkDetails', 'get')
