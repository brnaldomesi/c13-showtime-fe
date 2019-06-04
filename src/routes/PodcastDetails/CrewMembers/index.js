import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'

import CrewMemberItem from '../CrewMemberItem'

const CrewMembers = ({ match, crewMembers }) => (
  <Grid container spacing={2}>
    {crewMembers.map((item, index) => (
      <Grid item xs={12} key={item.guid}>
        <CrewMemberItem number={index + 1} crewMember={item} />
      </Grid>
    ))}
    <Grid item xs={12}>
      <Button color="primary" variant="outlined" fullWidth component={Link} to={`${match.url}/new`}>
        Add a crew member
      </Button>
    </Grid>
  </Grid>
)

CrewMembers.propTypes = {
  crewMembers: PropTypes.array.isRequired
}

export default CrewMembers
