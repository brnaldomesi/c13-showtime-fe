import fp from 'lodash/fp'
import get from 'lodash/get'

export const deserializeNetwork = network => ({
  name: network.name || '',
  status: network.status || 'ACTIVE'
})

export const serializeNetwork = values => ({
  name: values.name || '',
  status: values.status || 'ACTIVE'
})

export const deserializePodcast = podcast => ({
  title: podcast.title || '',
  summary: podcast.summary || '',
  slug: podcast.slug || '',
  websiteUrl: podcast.websiteUrl,
  // image: podcast.image,
  tags: podcast.tags,
  seoTitle: podcast.seoTitle,
  seoHeader: podcast.seoHeader,
  seoDescription: podcast.seoDescription,
  config: {
    enablePlayer: get(podcast, 'config.enablePlayer') || false,
    enableShowPage: get(podcast, 'config.enableShowPage') || false,
    enableShowHub: get(podcast, 'config.enableShowHub') || false,
    lockedSyncFields: get(podcast, 'config.lockedSyncFields') || []
  },
  categories: podcast.categories
})

export const serializePodcast = values => ({
  title: values.title,
  summary: values.summary,
  slug: values.slug,
  websiteUrl: values.websiteUrl,
  // image: values.image,
  tags: values.tags || [],
  seoTitle: values.seoTitle || null,
  seoHeader: values.seoHeader || null,
  seoDescription: values.seoDescription || null,
  config: {
    enablePlayer: get(values, 'config.enablePlayer') || false,
    enableShowPage: get(values, 'config.enableShowPage') || false,
    enableShowHub: get(values, 'config.enableShowHub') || false,
    lockedSyncFields: get(values, 'config.lockedSyncFields') || []
  },
  categories: values.categories
})

export const deserializeEpisode = episode => ({
  title: episode.title,
  summary: episode.summary,
  tags: fp.isNil(episode.tags) ? episode.snackableTags || [] : episode.tags || []
})

export const serializeEpisode = values => ({
  title: values.title,
  summary: values.summary,
  tags: values.tags || []
})

export const initializeCrewMember = () => ({
  firstName: '',
  lastName: '',
  biography: ''
})

export const serializeCrewMember = fp.pick(['firstName', 'lastName', 'biography'])

export const deserializeCrewMember = crewMember => ({
  firstName: crewMember.firstName || '',
  lastName: crewMember.lastName || '',
  biography: crewMember.biography || ''
})
