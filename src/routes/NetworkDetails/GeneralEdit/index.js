import * as Yup from 'yup'

import { Field, Formik } from 'formik'
import { deserializeNetwork, serializeNetwork } from 'utils/serializers'

import Button from '@material-ui/core/Button'
import FormCheckbox from 'components/FormCheckbox'
import FormLockerInput from 'components/FormLockerInput'
import Grid from '@material-ui/core/Grid'
import Hr from 'components/Hr'
import { Link } from 'react-router-dom'
import LoadingIndicator from 'components/LoadingIndicator'
import PropTypes from 'prop-types'
import React from 'react'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Network name is required')
})

const renderForm = props => (
  <form onSubmit={props.handleSubmit}>
    <Field name="name" label="Network Name" component={FormLockerInput} placeholder="Enter Network name here..." />
    <Field name="status" label="Active" toggleValues={['INACTIVE', 'ACTIVE']} component={FormCheckbox} />
    <Hr />
    <Grid container justify="flex-end" spacing={2}>
      <Grid item>
        <Button color="primary" type="submit" component={Link} to="/networks">
          Cancel
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" type="submit">
          Save Changes
        </Button>
      </Grid>
    </Grid>
    <Hr />
    {props.isSubmitting && <LoadingIndicator />}
  </form>
)

const GeneralEdit = ({ networkDetails, onSubmit }) => {
  const handleSubmit = (values, actions) => {
    return onSubmit(serializeNetwork(values), actions)
  }

  const initialValues = networkDetails ? deserializeNetwork(networkDetails) : {}
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={handleSubmit}
      validationSchema={validationSchema}>
      {renderForm}
    </Formik>
  )
}

GeneralEdit.propTypes = {
  networkDetails: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default GeneralEdit
