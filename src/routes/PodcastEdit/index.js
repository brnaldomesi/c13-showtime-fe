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
} from 'redux/modules/podcast'
import LoadingIndicator from 'components/LoadingIndicator'
import NavTabs from './NavTabs'
import GeneralForm from './GeneralForm'
import SubscribeLinksForm from './SubscribeLinksForm'
import styles from './styles'

const renderComingSoon = () => <div>Coming Soon...</div>

export const PodcastEdit = (props) => {
  const { classes, match, getPodcastDetails, podcastDetails, updatePodcastDetails } = props
  const { podcastGuid } = match.params

  useEffect(
    () => {
      getPodcastDetails({ guid: podcastGuid })
    },
    [podcastGuid, getPodcastDetails]
  )

  const handleSubmit = (values) => {
    updatePodcastDetails({ guid: podcastGuid, data: values })
  }

  return (
    <>
      <NavTabs />
      <Paper className={classes.paper}>
        {podcastDetails ? (
          <Switch>
            <Route
              path={`${match.path}/general`}
              render={props => (
                <GeneralForm
                  {...props}
                  initialValues={podcastDetails}
                  onSubmit={handleSubmit}
                />
              )}
            />
            <Route
              path={`${match.path}/staff`}
              render={renderComingSoon}
            />
            <Route
              path={`${match.path}/subscribe-links`}
              render={props => (
                <SubscribeLinksForm
                  {...props}
                  initialValues={podcastDetails}
                  onSubmit={handleSubmit}
                />
              )}
            />
            <Route
              path={`${match.path}/tags`}
              render={renderComingSoon}
            />
            <Route
              path={`${match.path}/settings`}
              render={renderComingSoon}
            />
            <Redirect to={`${match.url}/general`} />
          </Switch>
        ) : (
          <LoadingIndicator />
        )}
      </Paper>
    </>
  )
}

PodcastEdit.propTypes = {
  classes: PropTypes.object.isRequired,
  getPodcastDetails: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  podcastDetails: PropTypes.object,
  queryParams: PropTypes.object,
  updatePodcastDetails: PropTypes.func.isRequired,
}

const selector = createStructuredSelector({
  podcastDetails: podcastDetailsSelector
})

const actions = {
  getPodcastDetails,
  updatePodcastDetails,
}

export default compose(
  connect(selector, actions),
  withStyles(styles)
)(PodcastEdit)
