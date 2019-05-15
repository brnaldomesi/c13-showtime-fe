import createHistory from 'history/createBrowserHistory'
import thunkMiddleware from 'redux-thunk'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'

import locationReducer from './reducers/locationReducer'
import productLineReducer from './reducers/productLineReducer'

export const history = createHistory()

export function configureStore(initialState) {
  const reducer = combineReducers({
    locationReducer,
    productLineReducer,
    routing: routerReducer
  })

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunkMiddleware, routerMiddleware(history)))
  )

  return store
}
