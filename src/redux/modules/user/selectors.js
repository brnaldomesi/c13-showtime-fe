import { dataSelector, isRequestPending } from '../api'
import { EMPTY_LIST_DATA } from 'config/constants'

export const usersListSelector = dataSelector('usersList', EMPTY_LIST_DATA)

export const usersListLoadingSelector = isRequestPending('usersList', 'get')

export const userSelector = dataSelector('user', null)

export const userLoadingSelector = isRequestPending('user', 'get')

export const userDeletingSelector = isRequestPending('user', 'delete')
