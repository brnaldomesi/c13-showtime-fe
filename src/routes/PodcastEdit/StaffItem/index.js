import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'

import useStyles from './styles'

const getFullName = (staff) => `${staff.firstName} ${staff.lastName}`

const StaffItem = ({ staff, match, number }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Grid container spacing={2}>
        <Grid item className={classes.number}>
          <Typography>{number}</Typography>
        </Grid>
        <Grid item className={classes.image}>
          <CardMedia
            className={classes.cover}
            image={staff.imageUrl}
            title={getFullName(staff)}
          />
        </Grid>
        <Grid item xs>
          <IconButton
            className={classes.edit}
            component={Link}
            to={`${match.url}/${staff.guid}`}
          >
            <EditIcon />
          </IconButton>
          <Typography variant="subtitle1" className={classes.title}>
            {getFullName(staff)}
          </Typography>
          <Typography color="textSecondary">
            {staff.biography || <em>No biography yet</em>}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  )
}

StaffItem.propTypes = {
  classes: PropTypes.object.isRequired,
  staff: PropTypes.object.isRequired,
}

export default withRouter(StaffItem)
