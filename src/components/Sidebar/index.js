import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import IconCast from '@material-ui/icons/Cast'
import IconHome from '@material-ui/icons/Home'
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import LogoutIcon from '@material-ui/icons/PowerSettingsNew'
import PropTypes from 'prop-types'
import React from 'react'
import { authLogout } from 'redux/modules/auth'
import { compose } from 'redux'
import { connect } from 'react-redux'
import styles from './styles'
import { userIsAuthenticated } from 'hocs/withAuth'
import { withStyles } from '@material-ui/core/styles'

const SidebarItem = ({ icon, text, to, onClick }) => {
  const Icon = icon
  return (
    <ListItem button component={to ? Link : undefined} to={to} onClick={onClick}>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  )
}

const Sidebar = ({ authLogout, classes, open, toggle }) => {
  const handleToggle = () => toggle(!open)
  const sideList = (
    <div className={classes.list}>
      <List>
        <SidebarItem icon={IconHome} text="Home" to="/" />
      </List>
      <Divider />
      <List>
        <SidebarItem icon={IconCast} text="Networks" to="/networks" />
      </List>
      <List>
        <SidebarItem icon={IconCast} text="Podcasts" to="/podcasts" />
      </List>
      <List>
        <SidebarItem icon={IconCast} text="Featured Podcasts" to="/featuredPodcasts" />
      </List>
      <List>
        <SidebarItem icon={IconCast} text="Users" to="/users" />
      </List>
    </div>
  )

  return (
    <Drawer open={open} onClose={handleToggle}>
      <div tabIndex={0} role="button" onClick={handleToggle} onKeyDown={handleToggle}>
        {sideList}
      </div>
      <div className={classes.spacer} />
      <div className={classes.footer} onClick={handleToggle} onKeyDown={handleToggle}>
        <SidebarItem icon={LogoutIcon} text="Logout" onClick={authLogout} />
      </div>
    </Drawer>
  )
}

Sidebar.propTypes = {
  authLogout: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
}

const actions = {
  authLogout
}

export default compose(userIsAuthenticated, connect(null, actions), withStyles(styles))(Sidebar)
