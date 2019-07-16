import React, { useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
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
import {
  getPodcastsList,
  podcastsListSelector,
  podcastsListLoadingSelector
} from 'redux/modules/podcast'
import { truncate } from 'utils/helpers'
import { userIsAuthenticatedRedir } from 'hocs/withAuth'
import LoadingIndicator from 'components/LoadingIndicator'
import Pagination from 'components/Pagination'
import styles from './styles'
import ThumbnailImage from 'components/ThumbnailImage'
import withRouterAndQueryParams from 'hocs/withRouterAndQueryParams'

export const Podcasts = (props) => {
  const { classes, queryParams, getPodcastsList, podcasts, podcastsLoading } = props
  const { startAfter = null, endBefore = null, limit = DEFAULT_PAGE_SIZE } = queryParams
  const podcastsList = podcasts ? podcasts.results : []

  useEffect(
    () => {
      getPodcastsList({
        params: { startAfter, endBefore, limit }
      })
    },
    [startAfter, endBefore, limit, getPodcastsList]
  )

  return (
    <div className={classes.root}>
      <Typography variant="h6" gutterBottom>
        Podcasts
      </Typography>
      <Paper className={classes.root}>
        {podcastsLoading ? (
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
                {podcastsList.map(podcast => (
                  <TableRow key={podcast.guid}>
                    <TableCell scope="row" width={100}>
                      <ThumbnailImage
                        className={classes.image}
                        imageUrls={podcast.imageUrls}
                        title={podcast.title}
                        type="podcast"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" color="textPrimary">{podcast.title}</Typography>
                      <Typography color="textSecondary">{truncate(podcast.summary)}</Typography>
                    </TableCell>
                    <TableCell align="right" className={classes.actions}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.episodes}
                        to={`/podcasts/${podcast.guid}`}
                        component={Link}
                      >
                        Details
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.edit}
                        to={`/podcasts/${podcast.guid}/edit`}
                        component={Link}
                      >
                        Edit
                      </Button>
                      <Button variant="contained" color="secondary">Disable</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Pagination listData={podcasts} />
          </>
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
  queryParams: PropTypes.object,
}

const selector = createStructuredSelector({
  podcasts: podcastsListSelector,
  podcastsLoading: podcastsListLoadingSelector,
})

const actions = {
  getPodcastsList
}

export default compose(
  withRouterAndQueryParams,
  userIsAuthenticatedRedir,
  connect(selector, actions),
  withStyles(styles)
)(Podcasts)
