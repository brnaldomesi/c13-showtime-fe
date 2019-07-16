import React, { useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'

import {
  getPodcastDetails,
  podcastDetailsLoadingSelector,
  podcastDetailsSelector,
} from 'redux/modules/podcast'
import { userIsAuthenticatedRedir } from 'hocs/withAuth'
import CrewCarousel from './CrewCarousel'
import LoadingIndicator from 'components/LoadingIndicator'
import RecentEpisodes from './RecentEpisodes'
import ThumbnailImage from 'components/ThumbnailImage'
import styles from './styles'

export const PodcastDetails = (props) => {
  const { classes, match, getPodcastDetails, podcastDetails, podcastDetailsLoading } = props
  const { podcastGuid } = match.params

  useEffect(
    () => {
      getPodcastDetails({ guid: podcastGuid })
    },
    [podcastGuid, getPodcastDetails]
  )

  return (
    <>
      {podcastDetailsLoading && (
        <LoadingIndicator />
      )}
      {podcastDetails && (
        <Paper className={classes.paper}>
          <Hidden smUp>
            <Button
              className={classes.mobileEdit}
              variant="contained"
              color="primary"
              component={Link}
              to={`/podcasts/${podcastGuid}/edit`}
            >
              Edit
            </Button>
          </Hidden>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              <ThumbnailImage
                imageUrls={podcastDetails.imageUrls} 
                className={classes.image}
                type="podcast"
              />
              <Typography variant="subtitle1" gutterBottom>
                <strong>iTunes Categories</strong>
              </Typography>
              {podcastDetails.itunesCategories && podcastDetails.itunesCategories.length > 0 ? (
                podcastDetails.itunesCategories.map((category, index) => (
                  <Typography variant="body2" key={index}>{category}</Typography>
                ))
              ) : (
                <Typography variant="body2" paragraph><em>No iTunes categories specified.</em></Typography>
              )}
              <Typography variant="subtitle1" gutterBottom>
                <strong>Tags</strong>
              </Typography>
              {podcastDetails.tags && podcastDetails.tags.length > 0 ? (
                <Typography variant="body2">
                  {podcastDetails.tags.join(', ')}
                </Typography>
              ) : (
                <Typography variant="body2"><em>No tags specified.</em></Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={9}>
              <Grid container spacing={2} direction="row-reverse">
                <Hidden xsDown>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      component={Link}
                      to={`/podcasts/${podcastGuid}/edit`}
                    >
                      Edit
                    </Button>
                  </Grid>
                </Hidden>
                <Grid item xs={12} sm>
                  <Typography variant="h5" gutterBottom>
                    {podcastDetails.title}
                  </Typography>
                </Grid>
              </Grid>
              {podcastDetails.subtitle && (
                <Typography variant="h6" gutterBottom>
                  {podcastDetails.subtitle}
                </Typography>
              )}
              <Typography variant="body1" paragraph>
                {podcastDetails.summary}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Cast and Crew</strong>
              </Typography>
              <CrewCarousel podcastGuid={podcastDetails.guid} />
              <RecentEpisodes podcastGuid={podcastDetails.guid} />
            </Grid>
          </Grid>
        </Paper>
      )}
    </>
  )
}

PodcastDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  getPodcastDetails: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  podcastDetails: PropTypes.object,
}

const selector = createStructuredSelector({
  podcastDetails: podcastDetailsSelector,
  podcastDetailsLoading: podcastDetailsLoadingSelector,
})

const actions = {
  getPodcastDetails,
}

export default compose(
  userIsAuthenticatedRedir,
  connect(selector, actions),
  withStyles(styles)
)(PodcastDetails)