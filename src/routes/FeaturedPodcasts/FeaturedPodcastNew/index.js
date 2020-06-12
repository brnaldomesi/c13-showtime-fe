import FeaturedPodcastForm, { validationSchema } from '../components/FeaturedPodcastForm'

import Breadcrumbs from 'components/Breadcrumbs'
import { Formik } from 'formik'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import { createFeaturedPodcast } from 'redux/modules/podcast'
import { formSubmit } from 'utils/form'
import { makeStyles } from '@material-ui/core/styles'
import styles from './styles'

const useStyles = makeStyles(styles)

const initialValues = {
  title: '',
  featuredPodcasts: []
}

const FeaturedPodcastNew = ({ createFeaturedPodcast, history }) => {
  const classes = useStyles()

  const handleSubmit = (values, actions) => {
    return formSubmit(
      createFeaturedPodcast,
      {
        data: values,
        success: () => history.push('/featuredPodcasts')
      },
      actions
    )
  }

  const handleCancel = () => {
    history.goBack()
  }

  return (
    <div className={classes.root}>
      <Breadcrumbs />
      <Typography variant="h6" gutterBottom>
        Create a New Featured Podcast
      </Typography>
      <Paper className={classes.paper}>
        <Formik
          initialValues={initialValues}
          validateOnChange
          validateOnBlur
          onSubmit={handleSubmit}
          validationSchema={validationSchema}>
          {formikProps => <FeaturedPodcastForm {...formikProps} open={true} edit={true} onCancel={handleCancel} />}
        </Formik>
      </Paper>
    </div>
  )
}

FeaturedPodcastNew.propTypes = {
  createFeaturedPodcast: PropTypes.func.isRequired,
  featuredPodcast: PropTypes.object
}

const actions = {
  createFeaturedPodcast
}

export default connect(null, actions)(FeaturedPodcastNew)
