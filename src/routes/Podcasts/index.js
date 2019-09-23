import React, { useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Link } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import get from 'lodash/get'
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
import { getPodcastsList, podcastsListSelector, podcastsListLoadingSelector } from 'redux/modules/podcast'
import { truncate } from 'utils/helpers'
import { userIsAuthenticatedRedir } from 'hocs/withAuth'
import Breadcrumbs from 'components/Breadcrumbs'
import LoadingIndicator from 'components/LoadingIndicator'
import Pagination from 'components/Pagination'
import styles, { tableCellStyles } from './styles'
import ThumbnailImage from 'components/ThumbnailImage'
import withRouterAndQueryParams from 'hocs/withRouterAndQueryParams'

const TableCell = withStyles(tableCellStyles)(MuiTableCell)

export const Podcasts = props => {
  const { classes, queryParams, getPodcastsList, podcasts, podcastsLoading } = props
  const { prevCursor = null, nextCursor = null, limit = DEFAULT_PAGE_SIZE, search } = queryParams
  const podcastsList = podcasts ? podcasts.data : []
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    getPodcastsList({
      params: { prevCursor, nextCursor, limit, search },
      fail: () => enqueueSnackbar('Failed to load podcasts!', { variant: SNACKBAR_TYPE.ERROR })
    })
  }, [prevCursor, nextCursor, limit, getPodcastsList, enqueueSnackbar, search])

  return (
    <div className={classes.root}>
      <Breadcrumbs />
      <Typography variant="h6" gutterBottom>
        Podcasts
      </Typography>
      <Paper className={classes.root}>
        {podcastsLoading ? (
          <LoadingIndicator />
        ) : podcastsList.length > 0 ? (
          <>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Thumbnail</TableCell>
                  <TableCell width="40%">Title</TableCell>
                  <TableCell width="20%">Network</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {podcastsList.map(podcast => (
                  <TableRow key={podcast.id}>
                    <TableCell scope="row" width={100}>
                      <ThumbnailImage
                        className={classes.image}
                        imageUrls={podcast.imageUrls}
                        title={podcast.title}
                        type="podcast"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" color="textPrimary">
                        {podcast.title}
                      </Typography>
                      <Typography color="textSecondary">{truncate(podcast.summary)}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="textSecondary">
                        {get(podcast, 'network.name')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="textSecondary">
                        {podcast.status}
                      </Typography>
                    </TableCell>
                    <TableCell align="right" className={classes.actions}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.episodes}
                        to={`/podcasts/${podcast.id}/preview`}
                        component={Link}>
                        Preview
                      </Button>
                      <Button variant="contained" color="primary" to={`/podcasts/${podcast.id}`} component={Link}>
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Pagination listData={podcasts} />
          </>
        ) : (
          <div className={classes.emptyListWrapper}>
            <Typography>No Podcasts.</Typography>
          </div>
        )}
      </Paper>
    </div>
  )
}

Podcasts.propTypes = {
  classes: PropTypes.object.isRequired,
  getPodcastsList: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  podcasts: APIListType.isRequired,
  podcastsLoading: PropTypes.bool,
  pushWithQuery: PropTypes.func.isRequired,
  queryParams: PropTypes.object
}

const selector = createStructuredSelector({
  podcasts: podcastsListSelector,
  podcastsLoading: podcastsListLoadingSelector
})

const actions = {
  getPodcastsList
}

export default compose(
  withRouterAndQueryParams,
  userIsAuthenticatedRedir,
  connect(
    selector,
    actions
  ),
  withStyles(styles)
)(Podcasts)
