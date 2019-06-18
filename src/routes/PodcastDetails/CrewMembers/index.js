import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'

import { getCrewMembersList, crewMembersListSelector } from 'redux/modules/crew'
import CrewMemberItem from '../CrewMemberItem'

const CrewMembers = ({ match, crewMembers, getCrewMembersList }) => {
  const { podcastGuid } = match.params
  useEffect(
    () => {
      getCrewMembersList({ podcastGuid })
    },
    [podcastGuid, getCrewMembersList]
  )

  return (
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
}

CrewMembers.propTypes = {
  crewMembers: PropTypes.array.isRequired,
  getCrewMembersList: PropTypes.func.isRequired,
}

const selector = createStructuredSelector({
  crewMembers: crewMembersListSelector
})

const actions = {
  getCrewMembersList
}

export default connect(selector, actions)(CrewMembers)
