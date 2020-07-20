import * as Yup from 'yup'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { Field } from 'formik'
import FormLockerInput from 'components/FormLockerInput'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'

export const validationSchema = Yup.object().shape({
  headline: Yup.string().required('Title is required'),
  backgroundImgUrl: Yup.string().required('Title is required'),
  logoImgUrl: Yup.string().required('Title is required')
})

const TakeoverForm = ({ handleSubmit, isValid }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field name="headline" label="Headline *required" component={FormLockerInput} />
      <Box mb={2}>
        <Field name="subHeadline" label="Sub-headline" component={FormLockerInput} />
      </Box>
      <Grid container justify="flex-end" spacing={2}>
        <Grid item>
          <Button color="primary" type="submit" component={Link} to={`/`}>
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" type="submit" disabled={!isValid}>
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

TakeoverForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
  open: PropTypes.bool.isRequired,
  edit: PropTypes.bool.isRequired,
  onCancel: PropTypes.func
}

export default TakeoverForm
