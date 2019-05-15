import React, { Component } from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { withRouter } from 'react-router'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

class Main extends Component {
  static propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    domRef: PropTypes.func
  }

  render() {
    const { classes, className, children, domRef } = this.props

    return (
      <div className={cx(classes.root, className)} ref={domRef}>
        {children}
      </div>
    )
  }
}

export default compose(
  withRouter,
  withStyles(styles)
)(Main)
