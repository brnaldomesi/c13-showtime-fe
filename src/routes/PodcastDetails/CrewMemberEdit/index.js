import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Formik, Field } from 'formik'
import { Link } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import * as Yup from 'yup'

import { crewMemberDetailsSelector } from 'redux/modules/crew'
import { createCrewMemberDetails, getCrewMemberDetails, updateCrewMemberDetails } from 'redux/modules/crew'
import { formSubmit } from 'utils/form'
import { deserializeCrewMember, initializeCrewMember, serializeCrewMember } from 'utils/serializers'
import { SNACKBAR_TYPE } from 'config/constants'
// import FileDropzone from 'components/FileDropzone'
import FormInput from 'components/FormInput'
import Hr from 'components/Hr'
import LoadingIndicator from 'components/LoadingIndicator'

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  biography: Yup.string().required('Biography is required')
})

const renderForm = ({ handleSubmit, match, isSubmitting }) => (
  <form onSubmit={handleSubmit}>
    <Grid container spacing={3}>
      <Grid item sm={6}>
        <Field name="firstName" label="First Name" component={FormInput} placeholder="E.g. John" />
      </Grid>
      <Grid item sm={6}>
        <Field name="lastName" label="last Name" component={FormInput} placeholder="E.g. Doe" />
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
      {/*
      <Grid item sm={12}>
        <Field
          name="image"
          label="Image"
          component={FileDropzone}
        />
      </Grid>
      */}
    </Grid>
    <Hr />
    <Grid container justify="flex-end" spacing={2}>
      <Grid item>
        <Button color="primary" type="submit" component={Link} to={`/podcasts/${match.params.podcastId}/crew`}>
          Cancel
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" type="submit">
          Save Changes
        </Button>
      </Grid>
    </Grid>
    {isSubmitting && <LoadingIndicator />}
  </form>
)

const CrewMemberEdit = ({
  createCrewMemberDetails,
  crewMember,
  getCrewMemberDetails,
  history,
  match,
  updateCrewMemberDetails
}) => {
  const { crewId, podcastId } = match.params
  const { enqueueSnackbar } = useSnackbar()
  const handleSubmit = (values, actions) => {
    const saveCrewMember = crewId && crewId !== 'new' ? updateCrewMemberDetails : createCrewMemberDetails
    return formSubmit(
      saveCrewMember,
      {
        podcastId,
        crewId,
        data: serializeCrewMember(values),
        success: () => history.push(`/podcasts/${podcastId}/crew`),
        fail: () => enqueueSnackbar('Failed to save the crew member details.', { variant: SNACKBAR_TYPE.ERROR })
      },
      actions
    )
  }

  useEffect(() => {
    if (crewId) {
      getCrewMemberDetails({ crewId, podcastId })
    }
  }, [crewId, podcastId, getCrewMemberDetails])

  const initialValues = crewMember ? deserializeCrewMember(crewMember) : initializeCrewMember()

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={handleSubmit}
      render={props => renderForm({ ...props, match })}
      validationSchema={validationSchema}
    />
  )
}

CrewMemberEdit.propTypes = {
  createCrewMemberDetails: PropTypes.func.isRequired,
  crewMember: PropTypes.object,
  getCrewMemberDetails: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  updateCrewMemberDetails: PropTypes.func.isRequired
}

const selector = createStructuredSelector({
  crewMember: crewMemberDetailsSelector
})

const actions = {
  createCrewMemberDetails,
  getCrewMemberDetails,
  updateCrewMemberDetails
}

export default connect(
  selector,
  actions
)(CrewMemberEdit)
