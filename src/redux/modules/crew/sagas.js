import { takeLatest } from 'redux-saga/effects'

import { apiCallSaga } from '../api'
import {
  GET_CREW_MEMBER_DETAILS,
  GET_CREW_MEMBERS_LIST,
  CREATE_CREW_MEMBER,
  CREATE_CREW_MEMBER_DETAILS,
  UPDATE_CREW_MEMBER_DETAILS,
  UPLOAD_CREW_MEMBER_IMAGE,
  UPDATE_CREW_MEMBER
} from './types'

const getCrewMembersList = apiCallSaga({
  type: GET_CREW_MEMBERS_LIST,
  method: 'get',
  allowedParamKeys: [],
  path: ({ payload }) => `/podcasts/${payload.podcastId}/crew-members`,
  selectorKey: 'crewMembersList'
})

const getCrewMemberDetails = apiCallSaga({
  type: GET_CREW_MEMBER_DETAILS,
  method: 'get',
  allowedParamKeys: [],
  path: ({ payload }) => `/crew-members/${payload.crewId}`,
  selectorKey: 'crewMemberDetails'
})

const createCrewMemberApi = apiCallSaga({
  type: CREATE_CREW_MEMBER,
  method: 'post',
  allowedParamKeys: [],
  path: ({ payload }) => `/podcasts/${payload.podcastId}/crew-members`,
  selectorKey: 'crewMemberDetails'
})

const updateCrewMemberApi = apiCallSaga({
  type: UPDATE_CREW_MEMBER,
  method: 'patch',
  allowedParamKeys: [],
  path: ({ payload }) => `/podcasts/${payload.podcastId}/crew-members/${payload.crewId}`,
  payloadOnSuccess: (data, payload) => payload.data,
  selectorKey: 'crewMemberDetails'
})

const uploadCrewMemberImage = apiCallSaga({
  type: UPLOAD_CREW_MEMBER_IMAGE,
  method: 'post',
  allowedParamKeys: [],
  path: ({ payload }) => `/crew-members/${payload.crewId}/image`,
  selectorKey: 'crewMemberDetails.imageUrl'
})

const createCrewMemberDetails = function*(action) {
  const { payload } = action
  const { image, ...podcastData } = payload.data
  let result = yield createCrewMemberApi({
    type: CREATE_CREW_MEMBER,
    payload: {
      ...payload, // TODO: extract out `resolve` field if image field is ready
      data: podcastData
    }
  })

  if (result && image) {
    const imageData = new FormData()
    imageData.append('image', image)

    result = yield uploadCrewMemberImage({
      type: UPLOAD_CREW_MEMBER_IMAGE,
      payload: { data: imageData }
    })
  }
  return result
}

const updateCrewMemberDetails = function*(action) {
  const { payload } = action
  const { resolve, reject } = payload
  const { image, ...podcastData } = payload.data
  let result = yield updateCrewMemberApi({
    type: UPDATE_CREW_MEMBER,
    payload: {
      ...payload, // TODO: extract out `resolve` field if image field is ready
      data: podcastData
    }
  })

  if (result && image) {
    const imageData = new FormData()
    imageData.append('image', image)

    result = yield uploadCrewMemberImage({
      type: UPLOAD_CREW_MEMBER_IMAGE,
      payload: {
        reject,
        guid: payload.guid,
        data: imageData
      }
    })
  }

  if (resolve) {
    yield resolve()
  }

  return result
}

export default function* rootSaga() {
  yield takeLatest(GET_CREW_MEMBERS_LIST, getCrewMembersList)
  yield takeLatest(GET_CREW_MEMBER_DETAILS, getCrewMemberDetails)
  yield takeLatest(CREATE_CREW_MEMBER_DETAILS, createCrewMemberDetails)
  yield takeLatest(UPDATE_CREW_MEMBER_DETAILS, updateCrewMemberDetails)
  yield takeLatest(UPLOAD_CREW_MEMBER_IMAGE, uploadCrewMemberImage)
}
