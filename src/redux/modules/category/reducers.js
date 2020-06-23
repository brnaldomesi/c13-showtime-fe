import * as types from './types'

import concat from 'lodash/concat'
import { handleActions } from 'redux-actions'

const getInitialState = () => ({
  categoriesList: []
})

export default handleActions(
  {
    [types.GET_CATEGORIES_LIST_SUCCESS]: (state, { payload }) => ({
      ...state,
      categoriesList: payload
    }),
    [types.GET_CATEGORIES_LIST_FAIL]: (state, { payload }) => ({
      ...state
    }),
    [types.CREATE_CATEGORY_SUCCESS]: (state, { payload }) => ({
      ...state,
      categoriesList: concat(state.categoriesList, [payload])
    }),
    [types.UPDATE_CATEGORY_SUCCESS]: (state, { payload }) => ({
      ...state,
      categoriesList: state.categoriesList.map(category => (category.id === payload.id ? payload : category))
    }),
    [types.DELETE_CATEGORY_SUCCESS]: (
      state,
      {
        payload: {
          payload: { id }
        }
      }
    ) => ({
      ...state,
      categoriesList: state.categoriesList.filter(category => category.id !== id)
    }),
    [types.UPDATE_CATEGORIES_PRIORITY_SUCCESS]: (state, { payload }) => ({
      ...state,
      categoriesList: payload
    })
  },
  getInitialState()
)
