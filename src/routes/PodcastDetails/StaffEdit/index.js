import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Formik, Field } from 'formik'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import * as Yup from 'yup'

import { podcastDetailsSelector, updatePodcastDetails } from 'redux/modules/podcast'
import FormInput from 'components/FormInput'
import Hr from 'components/Hr'

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  biography: Yup.string().required('Biography is required'),
});

const renderForm = ({ handleSubmit, match }) => (
  <form onSubmit={handleSubmit}>
    <Grid container spacing={3}>
      <Grid item sm={6}>
        <Field
          name="firstName"
          label="First Name"
          component={FormInput}
          placeholder="E.g. John"
        />
      </Grid>
      <Grid item sm={6}>
        <Field
          name="lastName"
          label="last Name"
          component={FormInput}
          placeholder="E.g. Doe"
        />
      </Grid>
    </Grid>
    <Field
      name="biography"
      label="Biography"
      component={FormInput}
      multiline
      rows={6}
      placeholder="Enter biography here..."
    />
    <Hr />
    <Grid container justify="flex-end" spacing={2}>
      <Grid item>
        <Button color="primary" type="submit" component={Link} to={`/podcasts/${match.params.podcastGuid}/staff`}>
          Cancel
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" type="submit">Save Changes</Button>
      </Grid>
    </Grid>
  </form>
)

const StaffEdit = ({ match, podcastDetails, updatePodcastDetails }) => {
  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(true)
    await updatePodcastDetails({
      data: values
    })
    actions.setSubmitting(false)
  }

  const initialValues = podcastDetails
    ? (podcastDetails.staff || []).find((item) => item.guid === match.params.crewGuid)
    : {}

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      render={(props) => renderForm({ ...props, match })}
      validationSchema={validationSchema}
    />
  )
}

StaffEdit.propTypes = {
  podcastDetails: PropTypes.object.isRequired
}

const selector = createStructuredSelector({
  podcastDetails: podcastDetailsSelector
})

const actions = {
  updatePodcastDetails
}

export default connect(selector, actions)(StaffEdit)
