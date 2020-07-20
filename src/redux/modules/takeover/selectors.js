import { dataSelector, isRequestPending } from '../api'

export const takeoverSelector = dataSelector('takeover', null)
export const takeoverLoadingSelector = isRequestPending('takeover', 'get')
export const takeoverUpdatingSelector = isRequestPending('takeover', 'patch')
