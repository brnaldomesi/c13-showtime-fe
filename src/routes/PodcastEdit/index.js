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
import Breadcrumbs from 'components/Breadcrumbs'
import CrewMemberEdit from './CrewMemberEdit'
import CrewMembers from './CrewMembers'
import Episodes from './Episodes'
import GeneralEdit from './GeneralEdit'
import LoadingIndicator from 'components/LoadingIndicator'
import NavTabs from './NavTabs'
import SubscribeLinks from './SubscribeLinks'
import styles from './styles'

export const PodcastEdit = props => {
  const { classes, match, getPodcastDetails, podcastDetails, podcastDetailsLoading, updatePodcastDetails } = props
  const { podcastId } = match.params
  const basePath = `/podcasts/:podcastId/edit`

  useEffect(() => {
    getPodcastDetails({ id: podcastId })
  }, [podcastId, getPodcastDetails])

  const handleSubmit = (values, formActions) => {
    formSubmit(
      updatePodcastDetails,
      {
        id: podcastId,
        data: values
      },
      formActions
    )
  }

  return (
    <>
      <NavTabs podcastDetails={podcastDetails} />
      <div className={classes.content}>
        <Breadcrumbs />
        {podcastDetailsLoading ? (
          <LoadingIndicator />
        ) : podcastDetails ? (
          <Switch>
            <Route
              path={`${basePath}/general`}
              render={props => (
                <Paper className={classes.paper}>
                  <GeneralEdit {...props} podcastDetails={podcastDetails} onSubmit={handleSubmit} />
                </Paper>
              )}
            />
            <Route
              path={`${basePath}/crew/new`}
              render={props => (
                <Paper className={classes.paper}>
                  <CrewMemberEdit {...props} />
                </Paper>
              )}
            />
            <Route
              path={`${basePath}/crew/:crewId/edit`}
              render={props => (
                <Paper className={classes.paper}>
                  <CrewMemberEdit {...props} />
                </Paper>
              )}
            />
            <Route path={`${basePath}/crew`} exact component={CrewMembers} />
            <Route
              path={`${basePath}/subscribe-links`}
              render={props => (
                <Paper className={classes.paper}>
                  <SubscribeLinks {...props} initialValues={podcastDetails.subscriptionUrls} onSubmit={handleSubmit} />
                </Paper>
              )}
            />
            <Route path={`${basePath}/episodes`} exact component={Episodes} />
            <Redirect to={`${basePath}/general`} />
          </Switch>
        ) : null}
      </div>
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
