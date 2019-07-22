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

import { getNetworksList, networksListSelector, networksListLoadingSelector } from 'redux/modules/network'
import { userIsAuthenticatedRedir } from 'hocs/withAuth'
import LoadingIndicator from 'components/LoadingIndicator'
import styles from './styles'

export const Networks = props => {
  const { classes, getNetworksList, networks, networksLoading } = props
  const networksList = networks || []

  useEffect(() => {
    getNetworksList()
  }, [getNetworksList])

  return (
    <div className={classes.root}>
      <Typography variant="h6" gutterBottom>
        Networks
      </Typography>
      <Paper className={classes.root}>
        {networksLoading ? (
          <LoadingIndicator />
        ) : (
          <>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Podcasts</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {networksList.map(network => (
                  <TableRow key={network.guid}>
                    <TableCell>
                      <Typography variant="subtitle1" color="textPrimary">
                        {network.name}
                      </Typography>
                    </TableCell>
                    <TableCell className={classes.actions}>Active</TableCell>
                    <TableCell className={classes.actions}>
                      <Button className={classes.podcasts} to={`/networks/${network.guid}/podcasts`} component={Link}>
                        {network.podcasts || 0} Podcasts
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

Networks.propTypes = {
  classes: PropTypes.object.isRequired,
  getNetworksList: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  networks: PropTypes.array.isRequired,
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
  userIsAuthenticatedRedir,
  connect(
    selector,
    actions
  ),
  withStyles(styles)
)(Networks)
