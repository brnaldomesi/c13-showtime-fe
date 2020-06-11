import FeaturedPodcastForm, { validationSchema } from '../components/FeaturedPodcastForm'

import { Formik } from 'formik'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { createFeaturedPodcast } from 'redux/modules/podcast'
import { formSubmit } from 'utils/form'
import { makeStyles } from '@material-ui/core/styles'
import styles from './styles'

const useStyles = makeStyles(styles)

const initialValues = {
  title: '',
  featuredPodcasts: [
    {
      id: 1,
      imageUrls: {
        original:
          'https://megaphone.imgix.net/podcasts/0999f4c0-4334-11e8-954f-e7892b5b3609/image/uploads_2F1568815781454-qok6p4fxqo-ab964001f7207e83966bc54d11cc5d4b_2F48_promo_apple_3000x3000.jpg?ixlib=rails-2.1.2'
      },
      title: '48-Hours'
    },
    {
      id: 2,
      imageUrls: {
        original:
          'https://megaphone.imgix.net/podcasts/42befcfc-5d6b-11ea-8c0e-ef801c4fa7fc/image/image.jpg?ixlib=rails-2.1.2'
      },
      title: '4th and Forever'
    }
  ]
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

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={handleSubmit}
          validationSchema={validationSchema}>
          {formikProps => <FeaturedPodcastForm {...formikProps} open={true} edit={false} />}
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
