import React, { useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import dfFormat from 'date-fns/format'
import get from 'lodash/get'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'

import { APIListType } from 'utils/propTypes'
import { DEFAULT_PAGE_SIZE } from 'config/constants'
import { getEpisodesList, episodesListSelector, episodesListLoadingSelector } from 'redux/modules/episode'
import { truncate } from 'utils/helpers'
import { userIsAuthenticatedRedir } from 'hocs/withAuth'
import LoadingIndicator from 'components/LoadingIndicator'
import Pagination from 'components/Pagination'
import styles from './styles'
import withRouterAndQueryParams from 'hocs/withRouterAndQueryParams'

export const PodcastEpisodes = props => {
  const { classes, match, queryParams, getEpisodesList, episodes, episodesLoading } = props
  const { startAfter = null, endBefore = null, limit = DEFAULT_PAGE_SIZE } = queryParams
  const episodesList = episodes ? episodes.data : []

  useEffect(() => {
    getEpisodesList({
      podcastId: match.params.podcastId,
      params: { startAfter, endBefore, limit }
    })
  }, [startAfter, endBefore, limit, match, getEpisodesList])

  return (
    <div className={classes.root}>
      <Grid container alignItems="center">
        <Grid item xs>
          <Typography variant="h6" gutterBottom>
            Episodes
          </Typography>
        </Grid>
        <Grid item>
          <Button color="primary" component={Link} to={`/podcasts/${match.params.podcastId}`}>
            Back to Podcast
          </Button>
        </Grid>
      </Grid>
      <Paper className={classes.paper}>
        {episodesLoading ? (
          <LoadingIndicator />
        ) : (
          <>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Thumbnail</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {episodesList.map(episode => (
                  <TableRow key={episode.guid}>
                    <TableCell scope="row" width={100}>
                      <img src={get(episode, 'imageUrls.original')} width={100} alt="" />
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" color="textPrimary">
                        {episode.title}
                      </Typography>
                      <Typography color="textSecondary">{truncate(episode.summary)}</Typography>
                    </TableCell>
                    <TableCell align="right" className={classes.actions}>
                      <Typography variant="body1">{dfFormat(episode.publishedAt, 'MMMM D, YYYY')}</Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Pagination listData={episodes} />
          </>
        )}
      </Paper>
    </div>
  )
}

PodcastEpisodes.propTypes = {
  classes: PropTypes.object.isRequired,
  getEpisodesList: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  episodes: APIListType.isRequired,
  episodesLoading: PropTypes.bool,
  pushWithQuery: PropTypes.func.isRequired,
  queryParams: PropTypes.object
}

const selector = createStructuredSelector({
  episodes: episodesListSelector,
  episodesLoading: episodesListLoadingSelector
})

const actions = {
  getEpisodesList
}

export default compose(
  withRouterAndQueryParams,
  userIsAuthenticatedRedir,
  connect(
    selector,
    actions
  ),
  withStyles(styles)
)(PodcastEpisodes)
