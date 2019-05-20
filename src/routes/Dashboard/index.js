import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import styles from './styles'
import Typography from '@material-ui/core/Typography';

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

export default withStyles(styles)(Dashboard)
