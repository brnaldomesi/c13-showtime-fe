import React from 'react'
import { Formik, Field } from 'formik'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'

import FormInput from 'components/FormInput'
import styles from './styles'

const renderForm = (classes) => (props) => (
  <form onSubmit={props.handleSubmit}>
    <Field name="title" label="Podcast Title" component={FormInput} />
    <Field name="summary" label="Podcast Summary" component={FormInput} multiline rows={8} />
    <Divider className={classes.divider} />
    <Grid container spacing={16}>
      <Grid item sm={6}>
        <Field
          name="subscription_urls.GOOGLE_PODCASTS"
          label="Google Podcasts"
          placeholder="e.g. https://www.google.com/podcasts?feed=..."
          component={FormInput}
        />
      </Grid>
      <Grid item sm={6}>
        <Field
          name="subscription_urls.GOOGLE_PLAY"
          label="Google Play"
          placeholder="e.g. https://play.google.com/music/m/..."
          component={FormInput}
        />
      </Grid>
      <Grid item sm={6}>
        <Field
          name="subscription_urls.APPLE_PODCASTS"
          label="Apple Podcasts"
          placeholder="e.g. https://itunes.apple.com/podcast/..."
          component={FormInput}
        />
      </Grid>
      <Grid item sm={6}>
        <Field
          name="subscription_urls.SPOTIFY"
          label="Spotify"
          placeholder="e.g. https://open.spotify.com/show/..."
          component={FormInput}
        />
      </Grid>
      <Grid item sm={6}>
        <Field
          name="subscription_urls.STITCHER"
          label="Stitcher"
          placeholder="e.g. http://www.stitcher.com/podcast/..."
          component={FormInput}
        />
      </Grid>
      <Grid item sm={6}>
        <Field
          name="subscription_urls.RADIO_COM"
          label="Radio.com"
          placeholder="e.g. https://player.radio.com/listen/station/..."
          component={FormInput}
        />
      </Grid>
    </Grid>
    <Grid container justify="flex-end" spacing={16}>
      <Grid item>
        <Button color="primary" type="submit" component={Link} to="/podcasts">Discard</Button>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" type="submit">Save</Button>
      </Grid>
    </Grid>
  </form>
)

const PodcastEditForm = ({ classes, initialValues, onSubmit }) => {
  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(true)
    await onSubmit(values)
    actions.setSubmitting(false)
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      render={renderForm(classes)}
    />
  )
}

PodcastEditForm.propTypes = {
  classes: PropTypes.object.isRequired,
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default withStyles(styles)(PodcastEditForm)
