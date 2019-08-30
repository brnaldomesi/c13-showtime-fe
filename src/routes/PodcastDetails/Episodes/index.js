import React, { useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { useSnackbar } from 'notistack'
import { withStyles } from '@material-ui/core/styles'
import dfFormat from 'date-fns/format'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import MuiTableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'

import { APIListType } from 'utils/propTypes'
import { DEFAULT_PAGE_SIZE, SNACKBAR_TYPE } from 'config/constants'
import { getEpisodesList, episodesListSelector, episodesListLoadingSelector } from 'redux/modules/episode'
import { truncate } from 'utils/helpers'
import { userIsAuthenticatedRedir } from 'hocs/withAuth'
import LoadingIndicator from 'components/LoadingIndicator'
import Pagination from 'components/Pagination'
import styles, { tableCellStyles } from './styles'
import ThumbnailImage from 'components/ThumbnailImage'
import withRouterAndQueryParams from 'hocs/withRouterAndQueryParams'

const TableCell = withStyles(tableCellStyles)(MuiTableCell)

export const PodcastEpisodes = props => {
  const { classes, match, queryParams, getEpisodesList, episodes, episodesLoading } = props
  const { nextCursor = null, prevCursor = null, limit = DEFAULT_PAGE_SIZE } = queryParams
  const episodesList = episodes ? episodes.data : []
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    getEpisodesList({
      podcastId: match.params.podcastId,
      params: { nextCursor, prevCursor, limit },
      fail: () => enqueueSnackbar('Failed to load episodes of the podcast.', { variant: SNACKBAR_TYPE.ERROR })
    })
  }, [nextCursor, prevCursor, limit, match, getEpisodesList, enqueueSnackbar])

  return (
    <div className={classes.root}>
      <Typography variant="h6" gutterBottom>
        Episodes
      </Typography>
      <Paper className={classes.paper}>
        {episodesLoading ? (
          <LoadingIndicator />
        ) : (
          <>
            <Table className={classes.table} size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Thumbnail</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell className={classes.nowrap}>Publish Date</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {episodesList.map(episode => (
                  <TableRow key={episode.guid}>
                    <TableCell scope="row" width={100}>
                      <ThumbnailImage imageUrls={episode.imageUrl} type="podcast" className={classes.image} />
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" color="textPrimary">
                        {episode.title}
                      </Typography>
                    </TableCell>
                    <TableCell className={classes.nowrap}>
                      <Typography color="textSecondary" variant="caption">
                        {dfFormat(episode.publishedAt, 'MMMM D, YYYY')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="caption">
                        {truncate(episode.summary)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption">{episode.status}</Typography>
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
