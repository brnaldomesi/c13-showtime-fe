import React from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import IconCast from '@material-ui/icons/Cast'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import IconHome from '@material-ui/icons/Home'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import LogoutIcon from '@material-ui/icons/PowerSettingsNew'
import PropTypes from 'prop-types'
import styles from './styles'

const SidebarItem = ({ icon, text, to }) => {
  const Icon = icon
  return (
    <ListItem button component={to ? Link : undefined} to={to}>
      <ListItemIcon><Icon /></ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  )
}

const Sidebar = ({ classes, open, toggle }) => {
  const handleToggle = () => toggle(!open)
  const sideList = (
    <div className={classes.list}>
      <List>
        <SidebarItem icon={IconHome} text="Home" to="/" />
      </List>
      <Divider />
      <List>
        <SidebarItem icon={IconCast} text="Podcasts" to="/podcasts" />
        <SidebarItem icon={IconCast} text="Episodes" />
      </List>
    </div>
  )

  return (
    <Drawer open={open} onClose={handleToggle}>
      <div
        tabIndex={0}
        role="button"
        onClick={handleToggle}
        onKeyDown={handleToggle}
      >
        {sideList}
      </div>
      <div className={classes.spacer} />
      <div
        className={classes.footer}
        onClick={handleToggle}
        onKeyDown={handleToggle}
      >
        <SidebarItem icon={LogoutIcon} text="Logout" />
      </div>
    </Drawer>
  )
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
}

export default withStyles(styles)(Sidebar)
