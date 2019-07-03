import { all } from 'redux-saga/effects'

import { saga as crew } from './crew'
import { saga as episode } from './episode'
import { saga as podcast } from './podcast'
import { saga as todo } from './todo'

export default function* rootSaga() {
  yield all([podcast(), crew(), episode(), todo()])
}
