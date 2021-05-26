import React, { Component } from 'react'

import Breadcrumbs from 'components/Breadcrumbs'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import HomeIcon from '@material-ui/icons/Home'
import IconCast from '@material-ui/icons/Cast'
import IconNetwork from '@material-ui/icons/Share'
import IconPeopleOutline from '@material-ui/icons/PeopleOutline'
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import PropTypes from 'prop-types'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import Typography from '@material-ui/core/Typography'
import { compose } from 'redux'
import styles from './styles'
import { userIsAuthenticatedRedir } from 'hocs/withAuth'
import { withStyles } from '@material-ui/core/styles'

class Dashboard extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Breadcrumbs />
        <Grid container>
          <Grid item sm={6}>
            <List component="nav" aria-label="Navigation" className={classes.list}>
              <ListItem button component={Link} to="/networks">
                <ListItemIcon>
                  <IconNetwork />
                </ListItemIcon>
                <ListItemText primary="View Networks" />
                <ListItemSecondaryAction>
                  <Button color="primary" variant="contained" component={Link} to="/networks/new">
                    ADD NEW NETWORK
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem button component={Link} to="/podcasts">
                <ListItemIcon>
                  <IconCast />
                </ListItemIcon>
                <ListItemText primary="View Podcasts" />
              </ListItem>
              <ListItem button component={Link} to="/takeover">
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Show Hub Takeover" />
              </ListItem>
              <ListItem button component={Link} to="/featuredPodcasts">
                <ListItemIcon>
                  <ThumbUpIcon />
                </ListItemIcon>
                <ListItemText primary="Show Hub Categories" />
              </ListItem>
              <ListItem button component={Link} to="/users">
                <ListItemIcon>
                  <IconPeopleOutline />
                </ListItemIcon>
                <ListItemText primary="Manage Users" />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default compose(userIsAuthenticatedRedir, withStyles(styles))(Dashboard)
