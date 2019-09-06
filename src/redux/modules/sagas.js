import { all } from 'redux-saga/effects'

import { saga as auth } from './auth'
import { saga as crew } from './crew'
import { saga as episode } from './episode'
import { saga as network } from './network'
import { saga as podcast } from './podcast'
import { saga as user } from './user'
import { saga as todo } from './todo'

export default function* rootSaga() {
  yield all([auth(), network(), podcast(), crew(), episode(), user(), todo()])
}
