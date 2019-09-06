import React from 'react'
import { Field } from 'formik'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import * as Yup from 'yup'

import FormCheckbox from 'components/FormCheckbox'
import FormInput from 'components/FormInput'
import Hr from 'components/Hr'
import LoadingIndicator from 'components/LoadingIndicator'

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required('User email is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required')
})

const UserForm = ({ handleSubmit, isSubmitting }) => (
  <form onSubmit={handleSubmit}>
    <Grid container spacing={3}>
      <Grid item sm={6}>
        <Field name="firstName" label="First Name" component={FormInput} placeholder="E.g. John" />
      </Grid>
      <Grid item sm={6}>
        <Field name="lastName" label="Last Name" component={FormInput} placeholder="E.g. Doe" />
      </Grid>
    </Grid>
    <Field name="email" label="Email" component={FormInput} type="email" placeholder="e.g. john.doe@email.com" />
    <Field name="isActive" label="Active" toggleValues={[false, true]} component={FormCheckbox} />
    <Hr />
    <Grid container justify="flex-end" spacing={2}>
      <Grid item>
        <Button color="primary" type="submit" component={Link} to="/users">
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

UserForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool
}

export default UserForm
