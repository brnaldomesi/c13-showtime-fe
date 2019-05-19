import React from 'react'
import { compose } from 'redux'
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

import { DEFAULT_PAGE_SIZE } from 'config/constants'
import { truncate } from 'utils/helpers'
import styles from './styles'
import podcasts from 'apiMocks/podcasts.json'
import withRouterAndQueryParams from 'hocs/withRouterAndQueryParams';

export const Podcasts = (props) => {
  const { classes, location, pushWithQuery, queryParams } = props
  const { page = 1, pageSize = DEFAULT_PAGE_SIZE } = queryParams
  const totalCount = podcasts.count
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
      search: {
        ...queryParams,
        pageSize: event.target.value
      }
    })
  }

  return (
    <>
      <Typography variant="h6">Podcasts</Typography>
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
            {podcasts.map(row => (
              <TableRow key={row.id}>
                <TableCell scope="row">
                  <img src={row.image_url} width={100} />
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">{row.title}</Typography>
                  <Typography>{truncate(row.summary)}</Typography>
                </TableCell>
                <TableCell align="right" className={classes.actions}>
                  <Button variant="contained" color="primary" className={classes.edit}>Edit</Button>
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
    </>
  )
}

Podcasts.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  podcasts: PropTypes.array.isRequired,
  pushWithQuery: PropTypes.func.isRequired,
  queryParams: PropTypes.object,
}

export default compose(
  withRouterAndQueryParams,
  withStyles(styles)
)(Podcasts)
