import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { withStyles } from '@material-ui/core'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import { connect } from 'react-redux'

import HeaderSearchForm from 'components/HeaderSearchForm'
import styles from './styles'
import UserActionsMenu from 'components/UserActionsMenu'
import { isAuthenticatedSelector } from 'redux/modules/auth'

export const Header = ({ classes, isAuthenticated, toggleSidebar }) => (
  <AppBar position="fixed" className={classes.root}>
    <Toolbar disableGutters>
      {isAuthenticated ? (
        <IconButton color="inherit" onClick={() => toggleSidebar(true)} className={classes.menuButton}>
          <MenuIcon />
        </IconButton>
      ) : (
        <div className={classes.menuButton} />
      )}
      <Typography variant="h6" color="inherit" noWrap>
        C13 Showtime
      </Typography>
      {isAuthenticated && (
        <>
          <HeaderSearchForm />
          <div className={classes.spacer} />
          <UserActionsMenu />
        </>
      )}
    </Toolbar>
  </AppBar>
)

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
  toggleSidebar: PropTypes.func.isRequired
}

const selector = createStructuredSelector({
  isAuthenticated: isAuthenticatedSelector
})

export default compose(connect(selector), withStyles(styles))(Header)
