import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'

import ThumbnailImage from 'components/ThumbnailImage'
import useStyles from './styles'
import { getFullName } from 'utils/helpers'

const CrewMemberItem = ({ crewMember, match, number }) => {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <Grid container spacing={2}>
        <Grid item className={classes.number}>
          <Typography>{number}</Typography>
        </Grid>
        <Grid item className={classes.image}>
          <ThumbnailImage className={classes.cover} imageUrls={crewMember.imageUrls} title={getFullName(crewMember)} />
        </Grid>
        <Grid item xs>
          <IconButton className={classes.edit} component={Link} to={`${match.url}/${crewMember.id}`}>
            <EditIcon />
          </IconButton>
          <Typography variant="subtitle1" className={classes.title}>
            {getFullName(crewMember)}
          </Typography>
          <Typography color="textSecondary">{crewMember.biography || <em>No biography yet</em>}</Typography>
        </Grid>
      </Grid>
    </Card>
  )
}

CrewMemberItem.propTypes = {
  match: PropTypes.object.isRequired,
  number: PropTypes.number,
  crewMember: PropTypes.object.isRequired
}

export default withRouter(CrewMemberItem)
