import React from 'react'
import { Formik, Field } from 'formik'
import { Link } from 'react-router-dom'
import pick from 'lodash/pick'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'

import FormLockerInput from 'components/FormLockerInput'
import Hr from 'components/Hr'

const renderForm = (props) => (
  <form onSubmit={props.handleSubmit}>
    <Field
      name="subscriptionUrls.googlePodcasts"
      label="Google Podcasts"
      placeholder="e.g. https://www.google.com/podcasts?feed=..."
      component={FormLockerInput}
      lockerName="subscriptionUrls.locked"
      lockerValue="googlePodcasts"
    />
    <Field
      name="subscriptionUrls.googlePlay"
      label="Google Play"
      placeholder="e.g. https://play.google.com/music/m/..."
      component={FormLockerInput}
      lockerName="subscriptionUrls.locked"
      lockerValue="googlePlay"
    />
    <Field
      name="subscriptionUrls.applePodcasts"
      label="Apple Podcasts"
      placeholder="e.g. https://itunes.apple.com/podcast/..."
      component={FormLockerInput}
      lockerName="subscriptionUrls.locked"
      lockerValue="applePodcasts"
    />
    <Field
      name="subscriptionUrls.spotify"
      label="Spotify"
      placeholder="e.g. https://open.spotify.com/show/..."
      component={FormLockerInput}
      lockerName="subscriptionUrls.locked"
      lockerValue="spotify"
    />
    <Field
      name="subscriptionUrls.stitcher"
      label="Stitcher"
      placeholder="e.g. http://www.stitcher.com/podcast/..."
      component={FormLockerInput}
      lockerName="subscriptionUrls.locked"
      lockerValue="stitcher"
    />
    <Field
      name="subscriptionUrls.iHeart"
      label="iHeart"
      placeholder="e.g. http://www.iheart.com/playlist/..."
      component={FormLockerInput}
      lockerName="subscriptionUrls.locked"
      lockerValue="iHeart"
    />
    <Field
      name="subscriptionUrls.radioCom"
      label="Radio.com"
      placeholder="e.g. https://player.radio.com/listen/station/..."
      component={FormLockerInput}
      lockerName="subscriptionUrls.locked"
      lockerValue="radioCom"
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
  const handleSubmit = (values, actions) => {
    onSubmit(
      pick(values, ['subscriptionUrls']),
      actions
    )
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
