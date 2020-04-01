import React, { useEffect } from 'react'
import {
  getNetworkDetails,
  getNetworkPodcastsList,
  networkDetailsLoadingSelector,
  networkDetailsSelector,
  networkPodcastsListLoadingSelector,
  networkPodcastsListSelector,
  updateNetwork
} from 'redux/modules/network'
import styles, { tableCellStyles } from './styles'

import Breadcrumbs from 'components/Breadcrumbs'
import Button from '@material-ui/core/Button'
import GeneralEdit from './GeneralEdit'
import LeftPane from './LeftPane'
import { Link } from 'react-router-dom'
import LoadingIndicator from 'components/LoadingIndicator'
import MuiTableCell from '@material-ui/core/TableCell'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import { SNACKBAR_TYPE } from 'config/constants'
import SortableTableHead from 'components/SortableTableHead'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import ThumbnailImage from 'components/ThumbnailImage'
import Typography from '@material-ui/core/Typography'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import dfFormat from 'date-fns/format'
import { formSubmit } from 'utils/form'
import get from 'lodash/get'
import { useSnackbar } from 'notistack'
import { userIsAuthenticatedRedir } from 'hocs/withAuth'
import withSortHandler from 'hocs/withSortHandler'
import { withStyles } from '@material-ui/core/styles'

const TableCell = withStyles(tableCellStyles)(MuiTableCell)

const columns = [
  { id: 'thumbnail', label: 'Thumbnail', sortable: false, props: { width: 66 } },
  { id: 'title', label: 'Title' },
  { id: 'updatedAt', label: 'Last Publish Date', props: { width: 180 } },
  { id: 'status', label: 'Status', props: { width: 50 } },
  { id: 'actions', label: '', sortable: false }
]

export const NetworkDetails = props => {
  const {
    classes,
    getNetworkDetails,
    getNetworkPodcastsList,
    match,
    networkDetails,
    podcasts,
    podcastsLoading,
    networkDetailsLoading,
    updateNetwork,
    sortProps: { onRequestSort, sortedList, order, orderBy }
  } = props
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    getNetworkDetails({
      id: match.params.networkId,
      fail: () => enqueueSnackbar('Failed to load network details!', { variant: SNACKBAR_TYPE.ERROR })
    })
    getNetworkPodcastsList({
      networkId: match.params.networkId,
      fail: () => enqueueSnackbar('Failed to load podcasts of the network!', { variant: SNACKBAR_TYPE.ERROR })
    })
  }, [match, getNetworkDetails, getNetworkPodcastsList, enqueueSnackbar])

  const handleSubmit = (values, formActions) => {
    return formSubmit(
      updateNetwork,
      {
        id: match.params.networkId,
        data: values,
        success: () => {
          enqueueSnackbar('Saved successfully!', { variant: SNACKBAR_TYPE.SUCCESS })
          getNetworkPodcastsList({
            networkId: match.params.networkId,
            fail: () => enqueueSnackbar('Failed to load podcasts of the network!', { variant: SNACKBAR_TYPE.ERROR })
          })
        },
        fail: () => enqueueSnackbar('Failed to save the network details.', { variant: SNACKBAR_TYPE.ERROR })
      },
      formActions
    )
  }

  return (
    <>
      {!podcastsLoading && !networkDetailsLoading && <LeftPane networkDetails={networkDetails} />}
      <div className={classes.content}>
        <Breadcrumbs />
        <Paper className={classes.paper}>
          {podcastsLoading || networkDetailsLoading ? (
            <LoadingIndicator />
          ) : podcasts.length > 0 ? (
            <>
              <GeneralEdit networkDetails={networkDetails} onSubmit={handleSubmit} />
              <Table className={classes.table} size="small">
                <SortableTableHead columns={columns} onRequestSort={onRequestSort} order={order} orderBy={orderBy} />
                <TableBody>
                  {sortedList.map(podcast => (
                    <TableRow hover key={podcast.id}>
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
                          <Button component={Link} to={`/podcasts/${podcast.id}/preview`}>
                            {podcast.title}
                          </Button>
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="textSecondary">
                          {dfFormat(podcast.updatedAt, 'MMMM D, YYYY')}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="textSecondary">
                          {get(podcast, 'config.enableShowPage') ? 'Active' : 'Inactive'}
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
            </>
          ) : (
            <div className={classes.emptyListWrapper}>
              <Typography>No Podcasts.</Typography>
            </div>
          )}
        </Paper>
      </div>
    </>
  )
}

NetworkDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  getNetworkDetails: PropTypes.func.isRequired,
  getNetworkPodcastsList: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  networkDetails: PropTypes.object,
  networkDetailsLoading: PropTypes.bool,
  podcasts: PropTypes.array.isRequired,
  podcastsLoading: PropTypes.bool,
  updateNetwork: PropTypes.func.isRequired
}

const selector = createStructuredSelector({
  networkDetails: networkDetailsSelector,
  networkDetailsLoading: networkDetailsLoadingSelector,
  podcasts: networkPodcastsListSelector,
  podcastsLoading: networkPodcastsListLoadingSelector
})

const actions = {
  getNetworkDetails,
  getNetworkPodcastsList,
  updateNetwork
}

export default compose(
  userIsAuthenticatedRedir,
  connect(selector, actions),
  withSortHandler({ listPropName: 'podcasts' }),
  withStyles(styles)
)(NetworkDetails)
