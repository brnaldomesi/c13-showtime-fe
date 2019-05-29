import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import styles from './styles'
import { withStyles } from '@material-ui/core';

export const Header = ({ classes, toggleSidebar }) => (
  <AppBar position="fixed" className={classes.root}>
    <Toolbar disableGutters>
      <IconButton
        color="inherit"
        onClick={() => toggleSidebar(true)}
        className={classes.menuButton}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" color="inherit" noWrap>
        Cadence13 Showtime
      </Typography>
    </Toolbar>
  </AppBar>
)

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleSidebar: PropTypes.func.isRequired
}

export default withStyles(styles)(Header)
