import React, { useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'

import {
  getPodcastDetails,
  updatePodcastDetails,
  podcastDetailsSelector,
} from 'redux/modules/podcast'
import LoadingIndicator from 'components/LoadingIndicator'
import PodcastEditForm from './PodcastEditForm'
import styles from './styles'

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
    <Paper className={classes.root}>
      {podcastDetails ? (
        <PodcastEditForm
          initialValues={podcastDetails}
          onSubmit={handleSubmit}
        />
      ) : (
        <LoadingIndicator />
      )}
    </Paper>
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
