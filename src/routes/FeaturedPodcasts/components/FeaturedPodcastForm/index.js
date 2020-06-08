import * as Yup from 'yup'

import React, { useMemo } from 'react'

import { Field } from 'formik'
import FormAutocomplete from 'components/FormAutocomplete'
import FormLockerInput from 'components/FormLockerInput'
import Hr from 'components/Hr'
import LoadingIndicator from 'components/LoadingIndicator'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required')
})

const featuredPodcastsValidator = value => {
  if (typeof value === 'undefined' || value.length === 0) {
    return 'Featured podcasts are required.'
  } else {
    return undefined
  }
}

const FeaturedPodcastForm = ({ handleSubmit, isSubmitting, initialValues, setFieldValue }) => {
  const handleFeaturedPodcastsChange = (event, featuredPodcasts) => {
    setFieldValue('featuredPodcasts', featuredPodcasts)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Field name="title" label="Featured Podcast Section Title" component={FormLockerInput} />
      <Field
        id="featuredPodcasts"
        name="featuredPodcasts"
        label="Featured Podcasts"
        component={FormAutocomplete}
        options={initialValues}
        optionLabel="title"
        validate={featuredPodcastsValidator}
        onChange={handleFeaturedPodcastsChange}
        defaultValue={initialValues.featuredPodcasts}
        variant="outlined"
        multiple
      />

      {isSubmitting && <LoadingIndicator />}
    </form>
  )
}

FeaturedPodcastForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool
}

const actions = {}

export default connect(null, actions)(FeaturedPodcastForm)
