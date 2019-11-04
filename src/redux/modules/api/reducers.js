import get from 'lodash/get'
import set from 'lodash/set'
import unset from 'lodash/unset'
import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'

import { REQUEST_SUCCESS, REQUEST_REJECTED, REQUEST_PENDING } from './types'

export const requests = handleActions(
  {
    [REQUEST_PENDING]: (state, { payload }) => {
      const selectorKey = payload.requestSelectorKey || payload.selectorKey
      return {
        ...state,
        [selectorKey]: {
          ...state[selectorKey],
          [payload.method]: REQUEST_PENDING
        }
      }
    },

    [REQUEST_SUCCESS]: (state, { payload }) => {
      const selectorKey = payload.requestSelectorKey || payload.selectorKey
      return {
        ...state,
        [selectorKey]: {
          ...state[selectorKey],
          [payload.method]: REQUEST_SUCCESS
        }
      }
    },

    [REQUEST_REJECTED]: (state, { payload }) => {
      const selectorKey = payload.requestSelectorKey || payload.selectorKey
      return {
        ...state,
        [selectorKey]: {
          ...state[selectorKey],
          [payload.method]: REQUEST_REJECTED
        }
      }
    }
  },
  {}
)

export const data = handleActions(
  {
    [REQUEST_SUCCESS]: (state, { payload }) => {
      const newState = set({ ...state }, payload.selectorKey, payload.data)
      const subKeys = payload.selectorKey.split('.')
      subKeys.reduce((accKey, key) => {
        accKey = accKey ? [accKey, key].join('.') : key
        const fieldVal = get(newState, accKey)
        set(newState, accKey, Array.isArray(fieldVal) ? [...fieldVal] : { ...fieldVal })
        return accKey
      }, '')
      return newState
    },

    [REQUEST_REJECTED]: (state, { payload }) => {
      if (payload.method.toLowerCase() === 'get') {
        unset(state, payload.selectorKey)
      }
      return state
    }
  },
  {}
)

export default combineReducers({
  data,
  requests
})
