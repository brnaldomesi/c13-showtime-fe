import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core'

import styles from './styles'

export const Header = ({ classes, toggleSidebar }) => (
  <AppBar position="fixed" className={classes.root}>
    <Toolbar disableGutters>
      <IconButton color="inherit" onClick={() => toggleSidebar(true)} className={classes.menuButton}>
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" color="inherit" noWrap>
        Cadence13 Showtime
      </Typography>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Find a podcast..."
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
      </div>
      <Button component={Link} to="/podcasts" color="inherit">
        Podcasts
      </Button>
      <Button component={Link} to="/networks" color="inherit">
        Networks
      </Button>
    </Toolbar>
  </AppBar>
)

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleSidebar: PropTypes.func.isRequired
}

export default withStyles(styles)(Header)
