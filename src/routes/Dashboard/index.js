import React, { Component } from 'react'
import { compose } from 'redux'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import IconCast from '@material-ui/icons/Cast'
import IconNetwork from '@material-ui/icons/Share'
import IconPeopleOutline from '@material-ui/icons/PeopleOutline'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import PropTypes from 'prop-types'

import { userIsAuthenticatedRedir } from 'hocs/withAuth'
import styles from './styles'
import Typography from '@material-ui/core/Typography'
import Breadcrumbs from 'components/Breadcrumbs'

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
        <Typography variant="h4">Welcome to Cadence Showtime!</Typography>
        <Grid container>
          <Grid item sm={6}>
            <List component="nav" aria-label="Navigation" className={classes.list}>
              <ListItem button component={Link} to="/networks">
                <ListItemIcon>
                  <IconNetwork />
                </ListItemIcon>
                <ListItemText primary="View Networks" />
              </ListItem>
              <ListItem button component={Link} to="/podcasts">
                <ListItemIcon>
                  <IconCast />
                </ListItemIcon>
                <ListItemText primary="View Podcasts" />
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

export default compose(
  userIsAuthenticatedRedir,
  withStyles(styles)
)(Dashboard)
