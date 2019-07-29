import React, { useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Redirect, Route, Switch } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'

import {
  getPodcastDetails,
  updatePodcastDetails,
  podcastDetailsSelector,
  podcastDetailsLoadingSelector
} from 'redux/modules/podcast'
import { formSubmit } from 'utils/form'
import { userIsAuthenticatedRedir } from 'hocs/withAuth'
import LoadingIndicator from 'components/LoadingIndicator'
import NavTabs from './NavTabs'
import GeneralEdit from './GeneralEdit'
import CrewMembers from './CrewMembers'
import SubscribeLinks from './SubscribeLinks'
import CrewMemberEdit from './CrewMemberEdit'
import styles from './styles'

const renderComingSoon = () => <div>Coming Soon...</div>

export const PodcastEdit = props => {
  const { classes, match, getPodcastDetails, podcastDetails, podcastDetailsLoading, updatePodcastDetails } = props
  const { podcastGuid } = match.params

  useEffect(() => {
    getPodcastDetails({ guid: podcastGuid })
  }, [podcastGuid, getPodcastDetails])

  const handleSubmit = (values, formActions) => {
    formSubmit(
      updatePodcastDetails,
      {
        guid: podcastGuid,
        data: values
      },
      formActions
    )
  }

  return (
    <>
      <NavTabs podcastDetails={podcastDetails} />
      {podcastDetailsLoading ? (
        <LoadingIndicator />
      ) : podcastDetails ? (
        <Switch>
          <Route
            path={`${match.path}/general`}
            render={props => (
              <Paper className={classes.paper}>
                <GeneralEdit {...props} podcastDetails={podcastDetails} onSubmit={handleSubmit} />
              </Paper>
            )}
          />
          <Route
            path={`${match.path}/crew/new`}
            render={props => (
              <Paper className={classes.paper}>
                <CrewMemberEdit {...props} />
              </Paper>
            )}
          />
          <Route
            path={`${match.path}/crew/:crewGuid/edit`}
            render={props => (
              <Paper className={classes.paper}>
                <CrewMemberEdit {...props} />
              </Paper>
            )}
          />
          <Route path={`${match.path}/crew`} exact component={CrewMembers} />
          <Route
            path={`${match.path}/subscribe-links`}
            render={props => (
              <Paper className={classes.paper}>
                <SubscribeLinks {...props} initialValues={podcastDetails} onSubmit={handleSubmit} />
              </Paper>
            )}
          />
          <Route path={`${match.path}/settings`} render={renderComingSoon} />
          <Redirect to={`${match.url}/general`} />
        </Switch>
      ) : null}
    </>
  )
}

PodcastEdit.propTypes = {
  classes: PropTypes.object.isRequired,
  getPodcastDetails: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  podcastDetails: PropTypes.object,
  podcastDetailsLoading: PropTypes.bool,
  queryParams: PropTypes.object,
  updatePodcastDetails: PropTypes.func.isRequired
}

const selector = createStructuredSelector({
  podcastDetails: podcastDetailsSelector,
  podcastDetailsLoading: podcastDetailsLoadingSelector
})

const actions = {
  getPodcastDetails,
  updatePodcastDetails
}

export default compose(
  userIsAuthenticatedRedir,
  connect(
    selector,
    actions
  ),
  withStyles(styles)
)(PodcastEdit)
