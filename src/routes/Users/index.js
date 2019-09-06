import React, { useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Link } from 'react-router-dom'
import { useSnackbar } from 'notistack'
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
import { DEFAULT_PAGE_SIZE, SNACKBAR_TYPE } from 'config/constants'
import { getFullName } from 'utils/helpers'
import { getUsersList, usersListSelector, usersListLoadingSelector } from 'redux/modules/user'
import { userIsAuthenticatedRedir } from 'hocs/withAuth'
import Breadcrumbs from 'components/Breadcrumbs'
import LoadingIndicator from 'components/LoadingIndicator'
import Pagination from 'components/Pagination'
import styles from './styles'
import withRouterAndQueryParams from 'hocs/withRouterAndQueryParams'

export const Users = props => {
  const { classes, queryParams, getUsersList, users, usersLoading } = props
  const { prevCursor = null, nextCursor = null, limit = DEFAULT_PAGE_SIZE } = queryParams
  const usersList = users ? users.data : []
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    getUsersList({
      params: { prevCursor, nextCursor, limit },
      fail: () => enqueueSnackbar('Failed to load users!', { variant: SNACKBAR_TYPE.ERROR })
    })
  }, [prevCursor, nextCursor, limit, getUsersList, enqueueSnackbar])

  const handleDelete = id => () => {
    console.log({ id })
  }

  return (
    <div className={classes.root}>
      <Breadcrumbs />
      <Typography variant="h6" gutterBottom>
        Users
      </Typography>
      <Paper className={classes.root}>
        {usersLoading ? (
          <LoadingIndicator />
        ) : (
          <>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Full Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell width={205} />
                </TableRow>
              </TableHead>
              <TableBody>
                {usersList.map(user => (
                  <TableRow key={user.id}>
                    <TableCell>{getFullName(user)}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.isActive ? 'Active' : 'Inactive'}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.actionButton}
                        to={`/users/${user.id}`}
                        component={Link}>
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.actionButton}
                        onClick={handleDelete(user.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Pagination listData={users} />
          </>
        )}
      </Paper>
    </div>
  )
}

Users.propTypes = {
  classes: PropTypes.object.isRequired,
  getUsersList: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  users: APIListType.isRequired,
  usersLoading: PropTypes.bool
}

const selector = createStructuredSelector({
  users: usersListSelector,
  usersLoading: usersListLoadingSelector
})

const actions = {
  getUsersList
}

export default compose(
  withRouterAndQueryParams,
  userIsAuthenticatedRedir,
  connect(
    selector,
    actions
  ),
  withStyles(styles)
)(Users)
