import React, { useEffect } from 'react'
import { getNetworksList, networksListLoadingSelector, networksListSelector } from 'redux/modules/network'

import { APIListType } from 'utils/propTypes'
import Box from '@material-ui/core/Box'
import Breadcrumbs from 'components/Breadcrumbs'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import LoadingIndicator from 'components/LoadingIndicator'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import { SNACKBAR_TYPE } from 'config/constants'
import SortableTableHead from 'components/SortableTableHead'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import styles from './styles'
import { useSnackbar } from 'notistack'
import withSortHandler from 'hocs/withSortHandler'
import { withStyles } from '@material-ui/core/styles'

const columns = [
  { id: 'name', label: 'Title' },
  { id: 'status', label: 'Status' },
  { id: 'podcastCount', label: 'Podcasts' }
]

export const NetworkList = props => {
  const {
    classes,
    getNetworksList,
    history,
    networksLoading,
    sortProps: { onRequestSort, sortedList, order, orderBy }
  } = props
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    getNetworksList({
      fail: () => enqueueSnackbar('Failed to load networks!', { variant: SNACKBAR_TYPE.ERROR })
    })
  }, [getNetworksList, enqueueSnackbar])

  const handleRowClick = networkId => () => {
    history.push(`/networks/${networkId}`)
  }

  return (
    <div className={classes.root}>
      <Breadcrumbs />
      <Box display="flex">
        <Box flexGrow={1} display="flex" mb={1} alignItems="flex-end">
          <Typography variant="h6">Networks</Typography>
        </Box>
        <Box mb={2}>
          <Button color="primary" variant="contained" component={Link} to="/networks/new">
            ADD NEW NETWORK
          </Button>
        </Box>
      </Box>
      <Paper className={classes.root}>
        {networksLoading ? (
          <LoadingIndicator />
        ) : (
          <>
            <Table className={classes.table}>
              <SortableTableHead columns={columns} onRequestSort={onRequestSort} order={order} orderBy={orderBy} />
              <TableBody>
                {sortedList.map(network => (
                  <TableRow key={network.id} hover onClick={handleRowClick(network.id)} className={classes.row}>
                    <TableCell>
                      <Typography variant="subtitle1" color="textPrimary">
                        {network.name}
                      </Typography>
                    </TableCell>
                    <TableCell className={classes.actions}>{network.status}</TableCell>
                    <TableCell className={classes.actions}>
                      <Typography variant="subtitle1" color="textPrimary">
                        {network.podcastCount || 0} Podcasts
                      </Typography>
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

NetworkList.propTypes = {
  classes: PropTypes.object.isRequired,
  getNetworksList: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  networks: APIListType.isRequired,
  networksLoading: PropTypes.bool
}

const selector = createStructuredSelector({
  networks: networksListSelector,
  networksLoading: networksListLoadingSelector
})

const actions = {
  getNetworksList
}

export default compose(
  connect(selector, actions),
  withSortHandler({ listPropName: 'networks.data' }),
  withStyles(styles)
)(NetworkList)
