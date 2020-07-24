import * as Yup from 'yup'

import React, { useState } from 'react'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { Field } from 'formik'
import FormCheckbox from 'components/FormCheckbox'
import FormDraggableAutocomplete from 'components/FormDraggableAutocomplete'
import FormLockerInput from 'components/FormLockerInput'
import Grid from '@material-ui/core/Grid'
import LoadingIndicator from 'components/LoadingIndicator'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { allPodcastsSelector } from 'redux/modules/podcast'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Title is required')
})

const featuredPodcastsValidator = value => {
  if (typeof value === 'undefined' || value.length === 0) {
    return 'Featured podcasts are required.'
  } else {
    return undefined
  }
}

const FeaturedPodcastForm = ({
  handleSubmit,
  isSubmitting,
  isValid,
  setValues,
  setFieldTouched,
  setFieldValue,
  open,
  edit,
  onCancel,
  values,
  allPodcasts,
  type,
  name
}) => {
  const [editable, setEditable] = useState(edit)

  const handleFeaturedPodcastsChange = (event, featuredPodcasts) => {
    setFieldTouched('podcasts', true)
    setFieldValue('podcasts', featuredPodcasts)
  }

  const handleEditable = value => () => {
    setEditable(value)
    onCancel(setValues)
  }

  return (
    <form onSubmit={handleSubmit}>
      {isSubmitting ? (
        <Box display="flex" justifyContent="center">
          <LoadingIndicator isStatic />
        </Box>
      ) : (
        <>
          {type === 'APPLE_GENRE' ? (
            <Typography variant="subtitle1" gutterBottom>
              Apple Category: {name}
            </Typography>
          ) : (
            <Field name="name" label="Category Title" component={FormLockerInput} disabled={!editable} />
          )}
          <Field
            name="hidden"
            label="Hide on Show Hub"
            toggleValues={[false, true]}
            component={FormCheckbox}
            classes={{}}
            disabled={!editable}
          />
          {open && allPodcasts.length > 0 && (
            <Field
              id="podcasts"
              name="podcasts"
              label="Featured Podcasts"
              component={FormDraggableAutocomplete}
              options={allPodcasts}
              optionLabel="title"
              validate={featuredPodcastsValidator}
              onChange={handleFeaturedPodcastsChange}
              value={values.podcasts}
              variant="outlined"
              multiple
              disabled={!editable}
            />
          )}
          <Grid container justify="flex-end" spacing={2}>
            {editable ? (
              <>
                <Grid item>
                  <Button color="primary" onClick={handleEditable(false)}>
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" type="submit" disabled={!isValid}>
                    Save Changes
                  </Button>
                </Grid>
              </>
            ) : (
              <Grid item>
                <Button variant="contained" onClick={handleEditable(true)} color="primary">
                  Edit
                </Button>
              </Grid>
            )}
          </Grid>
        </>
      )}
    </form>
  )
}

FeaturedPodcastForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
  open: PropTypes.bool.isRequired,
  edit: PropTypes.bool.isRequired,
  onCancel: PropTypes.func
}

const selector = createStructuredSelector({
  allPodcasts: allPodcastsSelector
})

export default connect(selector, null)(FeaturedPodcastForm)
