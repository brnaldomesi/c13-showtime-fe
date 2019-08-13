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
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft'
import PeopleIcon from '@material-ui/icons/People'
import RssFeedIcon from '@material-ui/icons/RssFeed'
import ViewModuleIcon from '@material-ui/icons/ViewModule'
import Typography from '@material-ui/core/Typography'

import { SHOWS_DOMAIN } from 'config/constants'
import styles from './styles'
import ThumbnailImage from 'components/ThumbnailImage'

const menuItems = [
  { label: 'General', value: 'general', icon: FormatAlignLeftIcon },
  { label: 'Crew Members', value: 'crew', icon: PeopleIcon },
  { label: 'Subscribe Links', value: 'subscribe-links', icon: RssFeedIcon },
  { label: 'Episodes', value: 'episodes', icon: ViewModuleIcon }
]

export const NavTabs = ({ classes, history, match, podcastDetails }) => {
  const handleClick = value => () => {
    history.push(`/podcasts/${match.params.podcastId}/edit/${value}`)
  }

  return podcastDetails ? (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper
      }}>
      <div className={classes.toolbar} />
      <div className={classes.thumbWrapper}>
        <div className={classes.thumbInner}>
          <ThumbnailImage imageUrls={podcastDetails.imageUrls} className={classes.image} type="podcast" />
        </div>
      </div>
      <div className={classes.titleWrapper}>
        <Typography variant="subtitle1" align="center">
          {podcastDetails.title}
        </Typography>
      </div>
      <List>
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
      <div className={classes.button}>
        <Button
          variant="outlined"
          component={Link}
          fullWidth
          disabled={!podcastDetails}
          to={`/podcasts/${match.params.podcastId}`}>
          View Details
        </Button>
      </div>
      <div className={classes.button}>
        <Button
          variant="outlined"
          component="a"
          fullWidth
          target="_blank"
          disabled={!podcastDetails}
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
