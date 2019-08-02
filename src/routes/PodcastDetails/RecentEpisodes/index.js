import React, { useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import dfFormat from 'date-fns/format'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'

import { APIListType } from 'utils/propTypes'
import { getEpisodesList, episodesListSelector, episodesListLoadingSelector } from 'redux/modules/episode'
import { podcastDetailsLoadingSelector } from 'redux/modules/podcast'
import { truncate } from 'utils/helpers'
import LoadingIndicator from 'components/LoadingIndicator'
import styles from './styles'

export const RecentEpisodes = props => {
  const { classes, podcastId, getEpisodesList, episodes, episodesLoading, podcastDetailsLoading } = props
  const episodesList = episodes ? episodes.data : []

  useEffect(() => {
    getEpisodesList({
      podcastId: podcastId,
      params: { limit: 5 }
    })
  }, [podcastId, getEpisodesList])

  return (
    <div className={classes.root}>
      <Grid container alignItems="center">
        <Grid item xs>
          <Typography variant="subtitle1" gutterBottom>
            <strong>Recent Episodes</strong>
          </Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" component={Link} to={`/podcasts/${podcastId}/edit/episodes`}>
            Browse All
          </Button>
        </Grid>
      </Grid>
      {episodesLoading ? (
        <div className={classes.relative}>{!podcastDetailsLoading && <LoadingIndicator />}</div>
      ) : (
        <>
          <List className={classes.list}>
            {episodesList.map(episode => (
              <React.Fragment key={episode.guid}>
                <ListItem>
                  <ListItemText
                    primary={<strong>{episode.title}</strong>}
                    primaryTypographyProps={{
                      variant: 'subtitle2',
                      paragraph: true
                    }}
                    secondary={
                      <>
                        <Typography variant="body2" color="textPrimary" component="span" display="block">
                          {truncate(episode.summary)}
                        </Typography>
                        {dfFormat(episode.publishedAt, 'MMMM D, YYYY')}
                      </>
                    }
                  />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))}
          </List>
        </>
      )}
    </div>
  )
}

RecentEpisodes.propTypes = {
  classes: PropTypes.object.isRequired,
  episodes: APIListType.isRequired,
  episodesLoading: PropTypes.bool,
  getEpisodesList: PropTypes.func.isRequired,
  podcastId: PropTypes.string,
  podcastDetailsLoading: PropTypes.bool
}

const selector = createStructuredSelector({
  episodes: episodesListSelector,
  episodesLoading: episodesListLoadingSelector,
  podcastDetailsLoading: podcastDetailsLoadingSelector
})

const actions = {
  getEpisodesList
}

export default compose(
  connect(
    selector,
    actions
  ),
  withStyles(styles)
)(RecentEpisodes)
