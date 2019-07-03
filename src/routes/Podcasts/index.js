import React, { useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import get from 'lodash/get'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
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
import {
  getPodcastsList,
  podcastsListSelector,
  podcastsListLoadingSelector
} from 'redux/modules/podcast'
import { truncate } from 'utils/helpers'
import LoadingIndicator from 'components/LoadingIndicator';
import styles from './styles'
import withRouterAndQueryParams from 'hocs/withRouterAndQueryParams'

export const Podcasts = (props) => {
  const { classes, history, queryParams, getPodcastsList, podcasts, podcastsLoading } = props
  const { startAfter = null, endBefore = null, limit = DEFAULT_PAGE_SIZE } = queryParams
  const podcastsList = podcasts ? podcasts.results : []

  const handlePrevPage = (event) => {
    history.push(podcasts.links.prev)
  }

  const handleNextPage = event => {
    history.push(podcasts.links.next)
  }

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
                      <img src={get(podcast, 'imageUrls.original')} width={100} alt="" />
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
                        to={`/podcasts/${podcast.guid}/episodes`}
                        component={Link}
                      >
                        Episodes
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
            <Grid container>
              <Grid item xs />
              <Grid item>
                <IconButton onClick={handlePrevPage} disabled={!podcasts.links.prev}>
                  <ChevronLeftIcon />
                </IconButton>
                <IconButton onClick={handleNextPage} disabled={!podcasts.links.next}>
                  <ChevronRightIcon />
                </IconButton>
              </Grid>
            </Grid>
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
  connect(selector, actions),
  withStyles(styles)
)(Podcasts)
