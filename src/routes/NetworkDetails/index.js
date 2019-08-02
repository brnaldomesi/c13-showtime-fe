import React, { useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import dfFormat from 'date-fns/format'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import MuiTableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'

import {
  getNetworkDetails,
  getNetworkPodcastsList,
  networkDetailsSelector,
  networkDetailsLoadingSelector,
  networkPodcastsListSelector,
  networkPodcastsListLoadingSelector
} from 'redux/modules/network'
import { truncate } from 'utils/helpers'
import { userIsAuthenticatedRedir } from 'hocs/withAuth'
import LeftPane from './LeftPane'
import LoadingIndicator from 'components/LoadingIndicator'
import styles, { tableCellStyles } from './styles'
import ThumbnailImage from 'components/ThumbnailImage'

const TableCell = withStyles(tableCellStyles)(MuiTableCell)

export const NetworkDetails = props => {
  const {
    classes,
    getNetworkDetails,
    getNetworkPodcastsList,
    match,
    networkDetails,
    podcasts,
    podcastsLoading,
    networkDetailsLoading
  } = props

  useEffect(() => {
    getNetworkDetails({
      id: match.params.networkId
    })
    getNetworkPodcastsList({
      networkId: match.params.networkId
    })
  }, [match, getNetworkDetails, getNetworkPodcastsList])

  return (
    <>
      {!podcastsLoading && !networkDetailsLoading && <LeftPane networkDetails={networkDetails} />}
      <Paper className={classes.root}>
        {podcastsLoading || networkDetailsLoading ? (
          <LoadingIndicator />
        ) : podcasts.length > 0 ? (
          <>
            <Table className={classes.table} size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Thumbnail</TableCell>
                  <TableCell width="50%">Title</TableCell>
                  <TableCell className={classes.nowrap}>Last Publish Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {podcasts.map(podcast => (
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
                        {dfFormat(podcast.updatedAt, 'MMMM D, YYYY')}
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
                        to={`/podcasts/${podcast.id}`}
                        component={Link}>
                        Details
                      </Button>
                      <Button variant="contained" color="primary" to={`/podcasts/${podcast.id}/edit`} component={Link}>
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
  podcastsLoading: PropTypes.bool
}

const selector = createStructuredSelector({
  networkDetails: networkDetailsSelector,
  networkDetailsLoading: networkDetailsLoadingSelector,
  podcasts: networkPodcastsListSelector,
  podcastsLoading: networkPodcastsListLoadingSelector
})

const actions = {
  getNetworkDetails,
  getNetworkPodcastsList
}

export default compose(
  userIsAuthenticatedRedir,
  connect(
    selector,
    actions
  ),
  withStyles(styles)
)(NetworkDetails)
