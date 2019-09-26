import axios from 'axios'
import get from 'lodash/get'
import pick from 'lodash/pick'
import { call, put, select } from 'redux-saga/effects'

import { requestRejected, requestPending, requestSuccess } from './actions'
import { tokenSelector } from 'redux/modules/auth/selectors'

const defaultHeaders = token => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  ...(token
    ? {
        'X-CSRF-Token': token
      }
    : {})
})

export default ({
  type,
  method, // one of 'get', 'post', 'put', 'delete'
  path,
  allowedParamKeys,
  defaultParams,
  headers,
  stealthy,
  success, // Can be function generator to use yield
  fail, // Can be function generator to use yield
  payloadOnSuccess,
  payloadOnFail,
  requestSelectorKey,
  selectorKey
}) =>
  function*(action) {
    const payload = action.payload || {}
    const {
      data,
      params,
      headers: customHeaders,
      success: successCallback,
      fail: failCallback,
      cancelToken,
      onUploadProgress,
      onDownloadProgress,
      resolve,
      reject
    } = payload

    try {
      if (!stealthy) {
        yield put(requestPending({ selectorKey, requestSelectorKey, method }))
      }

      const queryParams = { ...defaultParams, ...params }

      const token = yield select(tokenSelector)

      const res = yield call(axios.request, {
        url: typeof path === 'function' ? path(action) : path,
        method: method.toLowerCase(),
        withCredentials: true,
        headers: {
          ...defaultHeaders(token),
          ...headers,
          ...(customHeaders ? customHeaders : {})
        },
        data,
        params: allowedParamKeys ? pick(queryParams, allowedParamKeys) : queryParams,
        baseURL: process.env.REACT_APP_API_HOST,
        cancelToken,
        onUploadProgress,
        onDownloadProgress
      })

      const payload = payloadOnSuccess ? payloadOnSuccess(res.data, action) : res.data
      yield put(
        requestSuccess({
          selectorKey,
          requestSelectorKey,
          method,
          data: payload
        })
      )

      if (resolve) {
        // Promise parameter
        yield resolve(payload)
      }

      if (success) {
        yield success(payload, action)
      }
      successCallback && successCallback(payload)

      return true
    } catch (err) {
      // console.error(err)
      const errRes = get(err, 'response', err)
      const payload = payloadOnFail ? payloadOnFail(errRes, action) : errRes
      if (!stealthy) {
        yield put(
          requestRejected({
            selectorKey,
            requestSelectorKey,
            method,
            data: payload
          })
        )
      }

      if (reject) {
        // Promise parameter
        yield reject(payload)
      }

      if (fail) {
        yield fail(errRes)
      }

      failCallback && failCallback(errRes)

      return false
    }
  }
