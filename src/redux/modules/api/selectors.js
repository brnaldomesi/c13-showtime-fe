import fp from 'lodash/fp'

import * as types from './types'

export const dataSelector = (selectorKey, defaultVal = null) =>
  fp.compose(
    fp.defaultTo(defaultVal),
    fp.get(selectorKey),
    fp.get('api.data')
  )

export const requestStatusSelector = (selectorKey, method = 'get') =>
  fp.compose(
    fp.defaultTo('INIT'),
    fp.get(method.toLowerCase()),
    fp.get(selectorKey),
    fp.get('api.requests')
  )

export const isRequestNil = (selectorKey, method) =>
  fp.compose(
    fp.isEqual('INIT'),
    requestStatusSelector(selectorKey, method)
  )

export const isRequestPending = (selectorKey, method) =>
  fp.compose(
    fp.isEqual(types.REQUEST_PENDING),
    requestStatusSelector(selectorKey, method)
  )

export const isRequestSuccess = (selectorKey, method) =>
  fp.compose(
    fp.isEqual(types.REQUEST_SUCCESS),
    requestStatusSelector(selectorKey, method)
  )

export const isRequestRejected = (selectorKey, method) =>
  fp.compose(
    fp.isEqual(types.REQUEST_REJECTED),
    requestStatusSelector(selectorKey, method)
  )
