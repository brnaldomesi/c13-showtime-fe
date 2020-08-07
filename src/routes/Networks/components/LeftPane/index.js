import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import PropTypes from 'prop-types'
import React from 'react'
import ThumbnailImage from 'components/ThumbnailImage'
import Typography from '@material-ui/core/Typography'
import ViewModuleIcon from '@material-ui/icons/ViewModule'
import styles from './styles'
import { withStyles } from '@material-ui/core/styles'

export const LeftPane = ({ classes, networkDetails, state }) => {
  const coverImgEditable =
    state === 'NETWORK_PODCASTS' || state === 'NETWORK_DETAILS' || state === 'NETWORK_PODCASTS_EDIT' ? false : true

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
          <ThumbnailImage
            imageUrls={networkDetails.cover_img_url}
            className={classes.image}
            type="podcast"
            editable={coverImgEditable}
          />
        </div>
      </div>
      <div className={classes.titleWrapper}>
        <Typography variant="subtitle1" align="center">
          {networkDetails.name}
        </Typography>
      </div>
      {(state === 'NETWORK_DETAILS' || state === 'NETWORK_PODCASTS') && (
        <>
          <div className={classes.thumbWrapper}>
            <Button
              color="primary"
              variant="contained"
              component={Link}
              to={`/networks/${networkDetails.id}/edit`}
              fullWidth>
              EDIT NETWORK
            </Button>
          </div>
          <List>
            <Divider className={classes.divider} />
            <ListItem button className={classes.button}>
              <ListItemIcon>
                <ViewModuleIcon />
              </ListItemIcon>
              <ListItemText primary="Podcasts" />
            </ListItem>
            <div className={classes.button}>
              {state === 'NETWORK_DETAILS' ? (
                <Button
                  color="primary"
                  variant="contained"
                  component={Link}
                  to={`/networks/${networkDetails.id}/podcasts`}
                  fullWidth>
                  ADD/REMOVE PODCASTS
                </Button>
              ) : (
                <Button
                  color="primary"
                  variant="contained"
                  component={Link}
                  to={`/networks/${networkDetails.id}/podcasts/edit`}
                  fullWidth>
                  ADD PODCASTS
                </Button>
              )}
            </div>
          </List>
        </>
      )}
      {state === 'NETWORK_EDIT' && (
        <List>
          <Divider className={classes.divider} />
          <div className={classes.button}>
            <Button color="primary" variant="contained" fullWidth>
              DELETE NETWORK
            </Button>
          </div>
        </List>
      )}
    </Drawer>
  ) : null
}

LeftPane.propTypes = {
  networkDetails: PropTypes.object,
  state: PropTypes.string
}

export default withStyles(styles)(LeftPane)
