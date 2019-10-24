import fp from 'lodash/fp'

export const deserializePodcast = podcast => ({
  ...podcast,
  config: { enableShowpage: fp.get('config.enableShowpage')(podcast) || false }
})

export const serializePodcast = fp.pick([
  'title',
  'summary',
  'slug',
  'websiteUrl',
  'lockedSyncFields',
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
