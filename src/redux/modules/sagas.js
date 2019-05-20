import { all } from 'redux-saga/effects'

import { saga as podcast } from './podcast'
import { saga as todo } from './todo'

export default function* rootSaga() {
  yield all([podcast(), todo()])
}
