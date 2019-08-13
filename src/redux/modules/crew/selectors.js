import { dataSelector, isRequestPending } from '../api'

export const crewMembersListSelector = dataSelector('crewMembersList', [])

export const crewMembersListLoadingSelector = isRequestPending('crewMembersList', 'get')

export const crewMemberDetailsSelector = dataSelector('crewMemberDetails', null)
