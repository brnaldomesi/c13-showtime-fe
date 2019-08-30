import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Link } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'

import { getCrewMembersList, crewMembersListSelector, crewMembersListLoadingSelector } from 'redux/modules/crew'
import { SNACKBAR_TYPE } from 'config/constants'
import CrewMemberItem from '../CrewMemberItem'
import LoadingIndicator from 'components/LoadingIndicator'

const CrewMembers = ({ match, crewMembers, getCrewMembersList, crewMembersListLoading }) => {
  const { podcastId } = match.params
  const { enqueueSnackbar } = useSnackbar()
  useEffect(() => {
    getCrewMembersList({
      podcastId,
      fail: () => enqueueSnackbar('Failed to load crew members of the podcast.', { variant: SNACKBAR_TYPE.ERROR })
    })
  }, [podcastId, getCrewMembersList, enqueueSnackbar])

  return (
    <Grid container spacing={2}>
      {crewMembersListLoading && <LoadingIndicator />}
      {crewMembers.map((item, index) => (
        <Grid item xs={12} key={item.id}>
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
  getCrewMembersList: PropTypes.func.isRequired
}

const selector = createStructuredSelector({
  crewMembers: crewMembersListSelector,
  crewMembersListLoading: crewMembersListLoadingSelector
})

const actions = {
  getCrewMembersList
}

export default connect(
  selector,
  actions
)(CrewMembers)
