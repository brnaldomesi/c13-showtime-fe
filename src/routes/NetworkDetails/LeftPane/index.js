import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ViewModuleIcon from '@material-ui/icons/ViewModule'
import Typography from '@material-ui/core/Typography'

import styles from './styles'
import ThumbnailImage from 'components/ThumbnailImage'

export const LeftPane = ({ classes, networkDetails }) => {
  return networkDetails ? (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper
      }}>
      <div className={classes.toolbar} />
      <div className={classes.thumbWrapper}>
        <div className={classes.thumbInner}>
          <ThumbnailImage imageUrls={networkDetails.cover_img_url} className={classes.image} type="podcast" />
        </div>
      </div>
      <div className={classes.titleWrapper}>
        <Typography variant="subtitle1" align="center">
          {networkDetails.name}
        </Typography>
      </div>
      <List>
        <Divider className={classes.divider} />
        <ListItem button>
          <ListItemIcon>
            <ViewModuleIcon />
          </ListItemIcon>
          <ListItemText primary="Podcasts" />
        </ListItem>
      </List>
    </Drawer>
  ) : null
}

export default withStyles(styles)(LeftPane)
