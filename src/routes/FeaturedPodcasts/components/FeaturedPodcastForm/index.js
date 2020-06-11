import * as Yup from 'yup'

import React, { useState } from 'react'

import Button from '@material-ui/core/Button'
import { Field } from 'formik'
import FormAutocomplete from 'components/FormAutocomplete'
import FormLockerInput from 'components/FormLockerInput'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'
import LoadingIndicator from 'components/LoadingIndicator'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

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

const options = [
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
  },
  {
    id: 3,
    imageUrls: {
      original:
        'https://content.production.cdn.art19.com/images/59/68/84/c8/596884c8-62fe-4b0b-b318-dbaadb2da4fc/8d7691e1e27e64d274bc08e032ec67a2dd5e9fa9c930abd247c46dc685407865bca1d31d04297ef7f9342e7ee701ccdfbdf48ce7c49ddb99ebe0334ac3da65d1.jpeg'
    },
    title: 'Alabama Insider'
  }
]

const FeaturedPodcastForm = ({
  handleSubmit,
  isSubmitting,
  isValid,
  initialValues,
  setFieldValue,
  open,
  edit,
  onExpand
}) => {
  const [editable, setEditable] = useState(edit)
  const history = useHistory()

  const handleFeaturedPodcastsChange = (event, featuredPodcasts) => {
    setFieldValue('featuredPodcasts', featuredPodcasts)
  }

  const handleEditable = value => () => {
    setEditable(value)
    onExpand(value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Field name="title" label="Featured Podcast Section Title" component={FormLockerInput} disabled={!editable} />
      {open && (
        <Field
          id="featuredPodcasts"
          name="featuredPodcasts"
          label="Featured Podcasts"
          component={FormAutocomplete}
          options={options}
          optionLabel="title"
          validate={featuredPodcastsValidator}
          onChange={handleFeaturedPodcastsChange}
          defaultValue={initialValues.featuredPodcasts}
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
            <Button variant="contained" onClick={handleEditable(true)} color="primary" disabled={!isValid}>
              Edit
            </Button>
          </Grid>
        )}
      </Grid>
      {isSubmitting && <LoadingIndicator />}
    </form>
  )
}

FeaturedPodcastForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
  open: PropTypes.bool.isRequired,
  edit: PropTypes.bool.isRequired,
  onExpand: PropTypes.func
}

const actions = {}

export default connect(null, actions)(FeaturedPodcastForm)
