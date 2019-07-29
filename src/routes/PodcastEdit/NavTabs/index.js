import React from 'react'
import { compose } from 'redux'
import { Link, withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ViewQuitIcon from '@material-ui/icons/ViewQuilt'
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft'
import PeopleIcon from '@material-ui/icons/People'
import RssFeedIcon from '@material-ui/icons/RssFeed'
import SettingsIcon from '@material-ui/icons/Settings'

import { SHOWS_DOMAIN } from 'config/constants'
import styles from './styles'

const menuItems = [
  { label: 'General', value: 'general', icon: FormatAlignLeftIcon },
  { label: 'Crew Members', value: 'crew', icon: PeopleIcon },
  { label: 'Subscribe Links', value: 'subscribe-links', icon: RssFeedIcon },
  { label: 'Settings', value: 'settings', icon: SettingsIcon }
]

export const NavTabs = ({ classes, history, match, podcastDetails }) => {
  const handleClick = value => () => {
    history.push(`${match.path.replace(':podcastGuid', match.params.podcastGuid).replace(':tabId', value)}`)
  }

  return podcastDetails ? (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper
      }}>
      <div className={classes.toolbar} />
      <List>
        <ListItem component={Link} button to={`/podcasts/${match.params.podcastGuid}`}>
          <ListItemIcon>
            <ViewQuitIcon />
          </ListItemIcon>
          <ListItemText primary="View Details" />
        </ListItem>
        <Divider className={classes.divider} />
        {menuItems.map((item, index) => {
          const Icon = item.icon
          return (
            <ListItem button key={index} onClick={handleClick(item.value)} selected={item.value === match.params.tabId}>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          )
        })}
      </List>
      <div className={classes.buttons}>
        <Button
          variant="outlined"
          component="a"
          fullWidth
          target="_blank"
          href={`https://${SHOWS_DOMAIN}/podcast/${podcastDetails.slug}`}>
          View on Show Hub
        </Button>
      </div>
    </Drawer>
  ) : null
}

export default compose(
  withRouter,
  withStyles(styles)
)(NavTabs)
