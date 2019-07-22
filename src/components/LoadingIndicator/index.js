import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles'

import styles from './styles'

const LoadingIndicator = ({ classes, className }) => (
  <div className={cx(classes.refreshOverlay, className)}>
    <CircularProgress size={70} thickness={5} />
  </div>
)

LoadingIndicator.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(LoadingIndicator)
