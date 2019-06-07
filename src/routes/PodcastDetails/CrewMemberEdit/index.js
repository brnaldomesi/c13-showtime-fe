import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Formik, Field } from 'formik'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import get from 'lodash/get'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import * as Yup from 'yup'

import { podcastDetailsSelector, } from 'redux/modules/podcast'
import { createCrewMemberDetails, updateCrewMemberDetails } from 'redux/modules/crew'
import FileDropzone from 'components/FileDropzone'
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
      <Grid item sm={12}>
        <Field
          name="biography"
          label="Biography"
          component={FormInput}
          multiline
          rows={6}
          placeholder="Enter biography here..."
        />
      </Grid>
      <Grid item sm={12}>
        <Field
          name="image"
          label="Image"
          component={FileDropzone}
        />
      </Grid>
    </Grid>
    <Hr />
    <Grid container justify="flex-end" spacing={2}>
      <Grid item>
        <Button color="primary" type="submit" component={Link} to={`/podcasts/${match.params.podcastGuid}/crew`}>
          Cancel
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" type="submit">Save Changes</Button>
      </Grid>
    </Grid>
  </form>
)

const CrewMemberEdit = ({
  match,
  podcastDetails,
  createCrewMemberDetails,
  updateCrewMemberDetails,
}) => {
  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(true)
    const saveCrewMember = match.params.crewGuid ? updateCrewMemberDetails : createCrewMemberDetails
    await saveCrewMember({
      data: values
    })
    actions.setSubmitting(false)
  }

  const crewMember = (get(podcastDetails, 'crewMembers') || [])
    .find(
      (item) => item.guid === match.params.crewGuid
    )
  const initialValues = crewMember ? { ...crewMember, image: crewMember.imageUrl } : {}

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      render={(props) => renderForm({ ...props, match })}
      validationSchema={validationSchema}
    />
  )
}

CrewMemberEdit.propTypes = {
  podcastDetails: PropTypes.object.isRequired
}

const selector = createStructuredSelector({
  podcastDetails: podcastDetailsSelector
})

const actions = {
  createCrewMemberDetails,
  updateCrewMemberDetails,
}

export default connect(selector, actions)(CrewMemberEdit)
