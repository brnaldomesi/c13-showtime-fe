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
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'

import { APIListType } from 'utils/propTypes'
import { DEFAULT_PAGE_SIZE } from 'config/constants'
import { getPodcastsList, podcastsListSelector } from 'redux/modules/podcast'
import { truncate } from 'utils/helpers'
import styles from './styles'
import withRouterAndQueryParams from 'hocs/withRouterAndQueryParams';

export const Podcasts = (props) => {
  const { classes, location, pushWithQuery, queryParams, getPodcastsList, podcasts } = props
  const { page = 1, pageSize = DEFAULT_PAGE_SIZE } = queryParams
  const totalCount = podcasts ? podcasts.count : 0
  const podcastsList = podcasts ? podcasts.rows : []
  const pageNavButtonProps = { className: classes.pageNavButton }

  const handleChangePage = (event, pageIndex) => {
    pushWithQuery({
      location: location,
      queryParams: {
        ...queryParams,
        page: pageIndex + 1
      }
    })
  }

  const handleChangeRowsPerPage = event => {
    pushWithQuery({
      location: location,
      queryParams: {
        ...queryParams,
        pageSize: event.target.value
      }
    })
  }

  useEffect(
    () => {
      getPodcastsList({ params: { page, pageSize } })
    },
    [page, pageSize, getPodcastsList]
  )

  return (
    <div className={classes.root}>
      <Typography variant="h6" gutterBottom>
        Podcasts
      </Typography>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Thumbnail</TableCell>
              <TableCell>Title</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {podcastsList.map(row => (
              <TableRow key={row.podcast_guid}>
                <TableCell scope="row">
                  <img src={row.image_url} width={100} alt="" />
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" color="textPrimary">{row.title}</Typography>
                  <Typography color="textSecondary">{truncate(row.summary)}</Typography>
                </TableCell>
                <TableCell align="right" className={classes.actions}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.edit}
                    to={`/podcasts/${row.podcast_guid}`}
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
        <TablePagination
          component="div"
          count={totalCount}
          rowsPerPage={Number(pageSize)}
          page={page - 1}
          classes={{ toolbar: classes.pageNavToolbar }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          rowsPerPageOptions={[1, 5, 10, 20, 50]}
          nextIconButtonProps={pageNavButtonProps}
          backIconButtonProps={pageNavButtonProps}
        />
      </Paper>
    </div>
  )
}

Podcasts.propTypes = {
  classes: PropTypes.object.isRequired,
  getPodcastsList: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  podcasts: APIListType.isRequired,
  pushWithQuery: PropTypes.func.isRequired,
  queryParams: PropTypes.object,
}

const selector = createStructuredSelector({
  podcasts: podcastsListSelector
})

const actions = {
  getPodcastsList
}

export default compose(
  withRouterAndQueryParams,
  connect(selector, actions),
  withStyles(styles)
)(Podcasts)
