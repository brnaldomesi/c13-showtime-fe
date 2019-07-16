import React, { Component } from 'react'
import { compose } from 'redux'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

import { userIsAuthenticatedRedir } from 'hocs/withAuth'
import styles from './styles'
import Typography from '@material-ui/core/Typography'

class Dashboard extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Typography variant="h4">Welcome to Cadence Showtime!</Typography>
      </div>
    )
  }
}

export default compose(
  userIsAuthenticatedRedir,
  withStyles(styles)
)(Dashboard)
