import { Field, Formik } from 'formik'

import Button from '@material-ui/core/Button'
import FormLockerInput from 'components/FormLockerInput'
import Grid from '@material-ui/core/Grid'
import Hr from 'components/Hr'
import { Link } from 'react-router-dom'
import LoadingIndicator from 'components/LoadingIndicator'
import PropTypes from 'prop-types'
import React from 'react'
import { SNACKBAR_TYPE } from 'config/constants'
import { connect } from 'react-redux'
import { formSubmit } from 'utils/form'
import pick from 'lodash/pick'
import { updateSubscriptionUrls } from 'redux/modules/podcast'
import { useSnackbar } from 'notistack'

const renderForm = props => (
  <form onSubmit={props.handleSubmit}>
    <Field
      name="googlePodcasts"
      label="Google Podcasts"
      placeholder="e.g. https://www.google.com/podcasts?feed=..."
      component={FormLockerInput}
      lockerName="lockedSyncFields"
      lockerValue="googlePodcasts"
    />
    <Field
      name="googlePlay"
      label="Google Play"
      placeholder="e.g. https://play.google.com/music/m/..."
      component={FormLockerInput}
      lockerName="lockedSyncFields"
      lockerValue="googlePlay"
    />
    <Field
      name="applePodcasts"
      label="Apple Podcasts"
      placeholder="e.g. https://itunes.apple.com/podcast/..."
      component={FormLockerInput}
      lockerName="lockedSyncFields"
      lockerValue="applePodcasts"
    />
    <Field
      name="spotify"
      label="Spotify"
      placeholder="e.g. https://open.spotify.com/show/..."
      component={FormLockerInput}
      lockerName="lockedSyncFields"
      lockerValue="spotify"
    />
    <Field
      name="radioCom"
      label="Radio.com"
      placeholder="e.g. https://player.radio.com/listen/station/..."
      component={FormLockerInput}
      lockerName="lockedSyncFields"
      lockerValue="radioCom"
    />
    <Field
      name="stitcher"
      label="Stitcher"
      placeholder="e.g. http://www.stitcher.com/podcast/..."
      component={FormLockerInput}
      lockerName="lockedSyncFields"
      lockerValue="stitcher"
    />
    <Field
      name="castbox"
      label="Castbox"
      placeholder="e.g. http://www.castbox.com/playlist/..."
      component={FormLockerInput}
      lockerName="lockedSyncFields"
      lockerValue="castbox"
    />
    <Hr />
    <Grid container justify="flex-end" spacing={3}>
      <Grid item>
        <Button color="primary" type="submit" component={Link} to="/podcasts">
          Cancel
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" type="submit">
          Save Changes
        </Button>
      </Grid>
    </Grid>
    {props.isSubmitting && <LoadingIndicator />}
  </form>
)

const SubscribeLinks = ({ initialValues, match, updateSubscriptionUrls }) => {
  const { enqueueSnackbar } = useSnackbar()
  const handleSubmit = async (values, actions) => {
    return formSubmit(
      updateSubscriptionUrls,
      {
        id: match.params.podcastId,
        data: pick(values, [
          'googlePodcasts',
          'googlePlay',
          'applePodcasts',
          'spotify',
          'radioCom',
          'stitcher',
          'castbox',
          'lockedSyncFields'
        ]),
        fail: () =>
          enqueueSnackbar('Failed to save the subscribe links for the podcast.', { variant: SNACKBAR_TYPE.ERROR })
      },
      actions
    )
  }

  return <Formik initialValues={initialValues} onSubmit={handleSubmit} render={renderForm} />
}

SubscribeLinks.propTypes = {
  match: PropTypes.object.isRequired,
  initialValues: PropTypes.object.isRequired,
  updateSubscriptionUrls: PropTypes.func.isRequired
}

const actions = {
  updateSubscriptionUrls
}

export default connect(null, actions)(SubscribeLinks)
