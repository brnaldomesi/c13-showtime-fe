import { put, takeLatest } from 'redux-saga/effects'

import {
  apiCallSaga,
  requestPending,
  requestRejected,
  requestSuccess,
} from '../api'
import {
  GET_CREW_MEMBER_DETAILS,
  CREATE_CREW_MEMBER,
  CREATE_CREW_MEMBER_DETAILS,
  UPDATE_CREW_MEMBER_DETAILS,
  UPLOAD_CREW_MEMBER_IMAGE,
  UPDATE_CREW_MEMBER,
} from './types'

const getCrewMemberDetails = apiCallSaga({
  type: GET_CREW_MEMBER_DETAILS,
  method: 'get',
  allowedParamKeys: [],
  path: ({ payload }) => `/api/crew-members/${payload.guid}`,
  payloadOnSuccess: data => data.data,
  selectorKey: 'crewMember'
})

const createCrewMemberApi = apiCallSaga({
  type: CREATE_CREW_MEMBER,
  method: 'post',
  allowedParamKeys: [],
  path: ({ payload }) => `/api/crew-members/${payload.podcastGuid}`,
  payloadOnSuccess: data => data.data,
  selectorKey: 'crewMember'
})

const updatePodcastApi = apiCallSaga({
  type: UPDATE_CREW_MEMBER,
  method: 'put',
  allowedParamKeys: [],
  path: ({ payload }) => `/api/crew-members/${payload.guid}`,
  payloadOnSuccess: data => data.data,
  selectorKey: 'crewMember'
})

const uploadCrewMemberImage = apiCallSaga({
  type: UPLOAD_CREW_MEMBER_IMAGE,
  method: 'post',
  allowedParamKeys: [],
  path: ({ payload }) => `/api/crew-members/${payload.guid}/image`,
  payloadOnSuccess: data => data.data,
  selectorKey: 'crewMember.imageUrl'
})

const createCrewMemberDetails = function* (action) {
  const { payload } = action
  const { image, ...podcastData } = payload.data
  yield put({ type: requestPending(CREATE_CREW_MEMBER_DETAILS) })
  let result = yield createCrewMemberApi({
    type: CREATE_CREW_MEMBER,
    payload: { data: podcastData }
  })

  if (result && image) {
    const imageData = new FormData()
    imageData.append('image', image)

    result = yield uploadCrewMemberImage({
      type: UPLOAD_CREW_MEMBER_IMAGE,
      payload: { data: imageData }
    })
  }

  if (result) {
    yield put({ type: requestSuccess(CREATE_CREW_MEMBER_DETAILS) })
  } else {
    yield put({ type: requestRejected(CREATE_CREW_MEMBER_DETAILS) })
  }
}

const updateCrewMemberDetails = function* (action) {
  const { payload } = action
  const { image, ...podcastData } = payload.data
  yield put({ type: requestPending(UPDATE_CREW_MEMBER_DETAILS) })
  let result = yield updatePodcastApi({
    type: UPDATE_CREW_MEMBER,
    payload: { data: podcastData }
  })

  if (result && image) {
    const imageData = new FormData()
    imageData.append('image', image)

    result = yield uploadCrewMemberImage({
      type: UPLOAD_CREW_MEMBER_IMAGE,
      payload: { data: imageData }
    })
  }

  if (result) {
    yield put({ type: requestSuccess(UPDATE_CREW_MEMBER_DETAILS) })
  } else {
    yield put({ type: requestRejected(UPDATE_CREW_MEMBER_DETAILS) })
  }
}

export default function* rootSaga() {
  yield takeLatest(GET_CREW_MEMBER_DETAILS, getCrewMemberDetails)
  yield takeLatest(CREATE_CREW_MEMBER_DETAILS, createCrewMemberDetails)
  yield takeLatest(UPDATE_CREW_MEMBER_DETAILS, updateCrewMemberDetails)
  yield takeLatest(uploadCrewMemberImage, uploadCrewMemberImage)
}
