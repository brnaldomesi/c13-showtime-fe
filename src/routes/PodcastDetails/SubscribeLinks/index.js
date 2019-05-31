import React from 'react'
import { Formik, Field } from 'formik'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'

import FormLockerInput from 'components/FormLockerInput'
import Hr from 'components/Hr'

const renderForm = (props) => (
  <form onSubmit={props.handleSubmit}>
    <Field
      name="subscriptionUrls.GOOGLE_PODCASTS"
      label="Google Podcasts"
      placeholder="e.g. https://www.google.com/podcasts?feed=..."
      component={FormLockerInput}
      lockerName="subscriptionUrls.locked"
      lockerValue="GOOGLE_PODCASTS"
    />
    <Field
      name="subscriptionUrls.GOOGLE_PLAY"
      label="Google Play"
      placeholder="e.g. https://play.google.com/music/m/..."
      component={FormLockerInput}
      lockerName="subscriptionUrls.locked"
      lockerValue="GOOGLE_PLAY"
    />
    <Field
      name="subscriptionUrls.APPLE_PODCASTS"
      label="Apple Podcasts"
      placeholder="e.g. https://itunes.apple.com/podcast/..."
      component={FormLockerInput}
      lockerName="subscriptionUrls.locked"
      lockerValue="APPLE_PODCASTS"
    />
    <Field
      name="subscriptionUrls.SPOTIFY"
      label="Spotify"
      placeholder="e.g. https://open.spotify.com/show/..."
      component={FormLockerInput}
      lockerName="subscriptionUrls.locked"
      lockerValue="SPOTIFY"
    />
    <Field
      name="subscriptionUrls.STITCHER"
      label="Stitcher"
      placeholder="e.g. http://www.stitcher.com/podcast/..."
      component={FormLockerInput}
      lockerName="subscriptionUrls.locked"
      lockerValue="STITCHER"
    />
    <Field
      name="subscriptionUrls.RADIO_COM"
      label="Radio.com"
      placeholder="e.g. https://player.radio.com/listen/station/..."
      component={FormLockerInput}
      lockerName="subscriptionUrls.locked"
      lockerValue="RADIO_COM"
    />
    <Hr />
    <Grid container justify="flex-end" spacing={3}>
      <Grid item>
        <Button color="primary" type="submit" component={Link} to="/podcasts">Cancel</Button>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" type="submit">Save Changes</Button>
      </Grid>
    </Grid>
  </form>
)

const SubscribeLinks = ({ initialValues, onSubmit }) => {
  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(true)
    await onSubmit(values)
    actions.setSubmitting(false)
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      render={renderForm}
    />
  )
}

SubscribeLinks.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default SubscribeLinks
