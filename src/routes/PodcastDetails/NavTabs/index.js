import React from 'react'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft'
import PeopleIcon from '@material-ui/icons/People'
import RssFeedIcon from '@material-ui/icons/RssFeed'
import LabelIcon from '@material-ui/icons/Label'
import SettingsIcon from '@material-ui/icons/Settings'
import styles from './styles'

const menuItems = [
  { label: 'General', value: 'general', icon: FormatAlignLeftIcon },
  { label: 'Crew Members', value: 'crew', icon: PeopleIcon },
  { label: 'Subscribe Links', value: 'subscribe-links', icon: RssFeedIcon },
  { label: 'Tags', value: 'tags', icon: LabelIcon },
  { label: 'Settings', value: 'settings', icon: SettingsIcon },
]

export const NavTabs = ({
  classes,
  history,
  match,
}) => {
  const handleClick = (value) => () => {
    history.push(
      `${match.path
        .replace(':podcastGuid', match.params.podcastGuid)
        .replace(':tabId', value)}`
    )
  }

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.toolbar} />
      <List>
        {menuItems.map((item, index) => {
          const Icon = item.icon
          return (
            <ListItem
              button
              key={index}
              onClick={handleClick(item.value)}
              selected={item.value === match.params.tabId}
            >
              <ListItemIcon><Icon /></ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          )
        })}
      </List>
    </Drawer>
  )
}

export default compose(
  withRouter,
  withStyles(styles)
)(NavTabs)
