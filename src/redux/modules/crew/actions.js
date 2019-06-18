import { createAction } from 'redux-actions'

import * as types from './types'

export const getCrewMembersList = createAction(types.GET_CREW_MEMBERS_LIST)

export const getCrewMemberDetails = createAction(types.GET_CREW_MEMBER_DETAILS)

export const createCrewMemberDetails = createAction(types.CREATE_CREW_MEMBER_DETAILS)

export const updateCrewMemberDetails = createAction(types.UPDATE_CREW_MEMBER_DETAILS)

export const uploadCrewMemberImage = createAction(types.UPLOAD_CREW_MEMBER_IMAGE)
