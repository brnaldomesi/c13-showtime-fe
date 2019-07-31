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
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'

import {
  getNetworkPodcastsList,
  networkPodcastsListSelector,
  networkPodcastsListLoadingSelector
} from 'redux/modules/network'
import { truncate } from 'utils/helpers'
import { userIsAuthenticatedRedir } from 'hocs/withAuth'
import LoadingIndicator from 'components/LoadingIndicator'
import styles from './styles'
import ThumbnailImage from 'components/ThumbnailImage'

export const NetworkDetails = props => {
  const { classes, getNetworkPodcastsList, match, podcasts, podcastsLoading } = props

  useEffect(() => {
    getNetworkPodcastsList({
      networkId: match.params.networkId
    })
  }, [match, getNetworkPodcastsList])

  return (
    <div className={classes.root}>
      <Paper className={classes.root}>
        {podcastsLoading ? (
          <LoadingIndicator />
        ) : (
          <>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Thumbnail</TableCell>
                  <TableCell width="50%">Title</TableCell>
                  <TableCell>Last Publish Date</TableCell>
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
                        imageUrls={podcast.imageUrl}
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
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.edit}
                        to={`/podcasts/${podcast.id}/edit`}
                        component={Link}>
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </Paper>
    </div>
  )
}

NetworkDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  getNetworkPodcastsList: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  podcasts: PropTypes.array.isRequired,
  podcastsLoading: PropTypes.bool
}

const selector = createStructuredSelector({
  podcasts: networkPodcastsListSelector,
  podcastsLoading: networkPodcastsListLoadingSelector
})

const actions = {
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
