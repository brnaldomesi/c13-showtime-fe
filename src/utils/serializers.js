import fp from 'lodash/fp'
import get from 'lodash/get'

export const deserializePodcast = podcast => ({
  title: podcast.title,
  summary: podcast.summary,
  slug: podcast.slug,
  websiteUrl: podcast.websiteUrl,
  // image: podcast.image,
  tags: podcast.tags,
  seoTitle: podcast.seoTitle,
  seoHeader: podcast.seoHeader,
  seoDescription: podcast.seoDescription,
  config: {
    enableShowpage: get(podcast, 'config.enableShowpage') || false,
    lockedSyncFields: get(podcast, 'config.lockedSyncFields') || []
  }
})

export const serializePodcast = fp.pick([
  'title',
  'summary',
  'slug',
  'websiteUrl',
  'config',
  // 'image',
  'tags',
  'seoTitle',
  'seoHeader',
  'seoDescription'
])

export const deserializeEpisode = episode => ({
  title: episode.title,
  summary: episode.summary,
  tags: fp.isNil(episode.tags) ? episode.snackableTags || [] : episode.tags || []
})

export const serializeEpisode = fp.pick(['title', 'summary', 'tags'])
