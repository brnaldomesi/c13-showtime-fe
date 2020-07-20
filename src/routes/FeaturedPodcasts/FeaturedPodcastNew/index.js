import FeaturedPodcastForm, { validationSchema } from '../components/FeaturedPodcastForm'
import React, { useEffect } from 'react'
import { allPodcastsLoadingSelector, allPodcastsSelector, getAllPodcasts } from 'redux/modules/podcast'

import Breadcrumbs from 'components/Breadcrumbs'
import { Formik } from 'formik'
import LoadingIndicator from 'components/LoadingIndicator'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import { SNACKBAR_TYPE } from 'config/constants'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import { createFeaturedPodcast } from 'redux/modules/category'
import { createStructuredSelector } from 'reselect'
import { formSubmit } from 'utils/form'
import { makeStyles } from '@material-ui/core/styles'
import styles from './styles'
import { useSnackbar } from 'notistack'

const useStyles = makeStyles(styles)

const initialValues = {
  name: '',
  podcasts: []
}

const FeaturedPodcastNew = ({ createFeaturedPodcast, history, getAllPodcasts, allPodcasts, allPodcastsLoading }) => {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (allPodcasts.length === 0) {
      getAllPodcasts({
        fail: () => enqueueSnackbar('Failed to load all podcasts!', { variant: SNACKBAR_TYPE.ERROR })
      })
    }
  }, [getAllPodcasts, enqueueSnackbar, allPodcasts])

  const handleSubmit = (values, actions) => {
    const length = values.podcasts.length
    const podcastsWithPriority = values.podcasts.map((podcast, index) => ({ ...podcast, priority: length - index }))
    values.podcasts = podcastsWithPriority
    values.slug = values.name
    values.priority = 0
    return formSubmit(
      createFeaturedPodcast,
      {
        data: values,
        success: () => {
          enqueueSnackbar('Saved successfully!', { variant: SNACKBAR_TYPE.SUCCESS })
          actions.resetForm(initialValues)
          history.push('/featuredPodcasts/new')
        },
        fail: () => enqueueSnackbar('Failed to create category!', { variant: SNACKBAR_TYPE.ERROR })
      },
      actions
    )
  }

  const handleCancel = () => {
    history.push('/featuredPodcasts')
  }

  return (
    <div className={classes.root}>
      <Breadcrumbs />
      <Typography variant="h6" gutterBottom>
        Create a New Featured Podcast
      </Typography>
      <Paper className={classes.paper}>
        {allPodcastsLoading ? (
          <LoadingIndicator />
        ) : (
          <Formik
            initialValues={initialValues}
            validateOnChange
            validateOnBlur
            onSubmit={handleSubmit}
            validationSchema={validationSchema}>
            {formikProps => <FeaturedPodcastForm {...formikProps} open={true} edit={true} onCancel={handleCancel} />}
          </Formik>
        )}
      </Paper>
    </div>
  )
}

FeaturedPodcastNew.propTypes = {
  createFeaturedPodcast: PropTypes.func.isRequired
}

const selector = createStructuredSelector({
  allPodcasts: allPodcastsSelector,
  allPodcastsLoading: allPodcastsLoadingSelector
})

const actions = {
  createFeaturedPodcast,
  getAllPodcasts
}

export default connect(selector, actions)(FeaturedPodcastNew)
