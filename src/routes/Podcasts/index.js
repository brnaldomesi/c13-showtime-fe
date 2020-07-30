import { DEFAULT_PAGE_SIZE, SNACKBAR_TYPE } from 'config/constants'
import React, { useEffect } from 'react'
import { getPodcastsList, podcastsListLoadingSelector, podcastsListSelector } from 'redux/modules/podcast'
import styles, { tableCellStyles } from './styles'

import { APIListType } from 'utils/propTypes'
import Breadcrumbs from 'components/Breadcrumbs'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import LoadingIndicator from 'components/LoadingIndicator'
import MuiTableCell from '@material-ui/core/TableCell'
import Pagination from 'components/Pagination'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import SortableTableHead from 'components/SortableTableHead'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import ThumbnailImage from 'components/ThumbnailImage'
import Typography from '@material-ui/core/Typography'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import get from 'lodash/get'
import { useSnackbar } from 'notistack'
import { userIsAuthenticatedRedir } from 'hocs/withAuth'
import withRouterAndQueryParams from 'hocs/withRouterAndQueryParams'
import withSortHandler from 'hocs/withSortHandler'
import { withStyles } from '@material-ui/core/styles'

const TableCell = withStyles(tableCellStyles)(MuiTableCell)

const columns = [
  { id: 'imageUrls', label: 'Thumbnail', sortable: false, props: { width: 66 } },
  { id: 'title', label: 'Title' },
  { id: 'slug', label: 'Slug', props: { width: '15%' } },
  { id: 'network.name', label: 'Network', props: { width: '12%' } },
  { id: 'config.enableShowPage', label: 'Show Hub Status', props: { width: '9%' } },
  { id: 'actions', label: '', sortable: false, props: { width: 210 } }
]

export const Podcasts = props => {
  const {
    classes,
    queryParams,
    getPodcastsList,
    podcasts,
    podcastsLoading,
    sortProps: { onRequestSort, sortedList, order, orderBy }
  } = props
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
              {/* <TableHead>
                <TableRow>
                  <TableCell width={66}>Thumbnail</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell width="15%">Slug</TableCell>
                  <TableCell width="12%">Network</TableCell>
                  <TableCell width="8%">Show Hub Status</TableCell>
                  <TableCell width={210} />
                </TableRow>
              </TableHead> */}
              <SortableTableHead columns={columns} onRequestSort={onRequestSort} order={order} orderBy={orderBy} />
              <TableBody>
                {sortedList.map(podcast => (
                  <TableRow key={podcast.id}>
                    <TableCell scope="row" width={50}>
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
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="textSecondary">
                        {podcast.slug}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="textSecondary">
                        {get(podcast, 'network.name')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="textSecondary">
                        {get(podcast, 'config.enableShowPage') ? 'Enabled' : 'Disabled'}
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
  connect(selector, actions),
  withSortHandler({ listPropName: 'podcasts.data' }),
  withStyles(styles)
)(Podcasts)
