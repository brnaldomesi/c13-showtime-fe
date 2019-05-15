import { handleActions } from 'redux-actions'
import * as types from './types'

export default handleActions(
  {
    [types.TODO_ACTION]: (state, { payload }) => ({
      ...state,
      counter: state.counter + 1
    })
  },
  {
    counter: 0
  }
)
