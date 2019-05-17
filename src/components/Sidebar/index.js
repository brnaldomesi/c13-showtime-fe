import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import CastIcon from '@material-ui/icons/Cast'
import LogoutIcon from '@material-ui/icons/PowerSettingsNew'
import styles from './styles'

const SidebarItem = ({ icon, text }) => {
  const Icon = icon
  return (
    <ListItem button>
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
        <SidebarItem icon={CastIcon} text="Podcasts" />
      </List>
      <Divider />
      <List>
        <SidebarItem icon={CastIcon} text="Episodes" />
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
