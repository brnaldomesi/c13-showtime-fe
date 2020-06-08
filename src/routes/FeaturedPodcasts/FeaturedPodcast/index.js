import FeaturedPodcastForm, { validationSchema } from '../components/FeaturedPodcastForm'

import { Formik } from 'formik'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { formSubmit } from 'utils/form'
import { makeStyles } from '@material-ui/core/styles'
import styles from './styles'
import { updateFeaturedPodcast } from 'redux/modules/podcast'

const useStyles = makeStyles(styles)

const FeaturedPodcast = ({ featuredPodcast, updateFeaturedPodcast, match }) => {
  const featuredPodcastId = featuredPodcast.id
  const classes = useStyles()

  const handleSubmit = (values, actions) => {
    return formSubmit(
      updateFeaturedPodcast,
      {
        id: featuredPodcastId,
        data: values
      },
      actions
    )
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Formik
          initialValues={featuredPodcast}
          validateOnChange
          validateOnBlur
          onSubmit={handleSubmit}
          component={FeaturedPodcastForm}
          validationSchema={validationSchema}
        />
      </Paper>
    </div>
  )
}

FeaturedPodcast.propTypes = {
  updateFeaturedPodcast: PropTypes.func.isRequired,
  featuredPodcast: PropTypes.array
}

const selector = createStructuredSelector({})

const actions = {
  updateFeaturedPodcast
}

export default connect(selector, actions)(FeaturedPodcast)
