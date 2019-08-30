import React, { useState } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import AccountCircle from '@material-ui/icons/AccountCircle'
import IconButton from '@material-ui/core/IconButton'
import LogoutIcon from '@material-ui/icons/PowerSettingsNew'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import PropTypes from 'prop-types'

import { authLogout } from 'redux/modules/auth'
import styles from './styles'

const useStyles = makeStyles(styles)

const UserActionsMenu = ({ authLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const classes = useStyles()

  const handleMenu = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    handleClose()
    authLogout()
  }

  return (
    <div className={classes.root}>
      <IconButton onClick={handleMenu} color="inherit">
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        open={open}
        onClose={handleClose}>
        <MenuItem onClick={handleClose}>
          <ListItemIcon className={classes.itemIcon}>
            <AccountCircle />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon className={classes.itemIcon}>
            <LogoutIcon />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  )
}

UserActionsMenu.propTypes = {
  authLogout: PropTypes.func.isRequired
}

const actions = {
  authLogout
}

export default connect(
  null,
  actions
)(UserActionsMenu)
