import * as types from './types'

import { createAction } from 'redux-actions'

export const getTakeover = createAction(types.GET_TAKEOVER)
export const presignedPost = createAction(types.PRESIGNED_POST)
export const updateTakeover = createAction(types.UPDATE_TAKEOVER)
export const uploadToS3 = createAction(types.UPLAOD_TO_S3)
export const confirmAndDeleteImg = createAction(types.CONFIRM_AND_DELETE_IMG)
