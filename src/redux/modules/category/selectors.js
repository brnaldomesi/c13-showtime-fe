import { createSelector } from 'reselect'
import fp from 'lodash/fp'
import { isRequestPending } from '../api'

export const categorySelector = fp.get('category')

export const featuredPodcastsListSelector = createSelector(categorySelector, fp.get('categoriesList'))

export const featuredPodcastsListLoadingSelector = isRequestPending('featuredPodcastsList', 'get')

export const featuredPodcastDeletingSelector = isRequestPending('featuredPodcastDetails', 'delete')

export const updateCategoriesLoadingSelector = isRequestPending('featuredPodcastsList', 'patch')

export const categoryUpdatingSelector = isRequestPending('featuredPodcastDetails', 'patch')
