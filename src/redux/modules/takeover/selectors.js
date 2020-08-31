import { isRequestPending } from '../api'

export const takeoverLoadingSelector = isRequestPending('takeover', 'get')
export const presignedPostingSelector = isRequestPending('presignedPost', 'post')
export const uploadingSelector = isRequestPending('s3', 'post')
export const takeoverUpdatingSelector = isRequestPending('takeover', 'patch')
