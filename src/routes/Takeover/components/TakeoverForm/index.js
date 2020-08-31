import * as Yup from 'yup'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { Field } from 'formik'
import FormHeroImage from 'components/FormHeroImage'
import FormLockerInput from 'components/FormLockerInput'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'

export const validationSchema = Yup.object().shape({
  headline: Yup.string().required('Headline is required'),
  bgDesktop: Yup.string().required('Background img is required'),
  logo: Yup.string().required('Logo img is required')
})

const TakeoverForm = ({ handleSubmit, isValid, initialValues, setFieldValue }) => (
  <form onSubmit={handleSubmit}>
    <Box display="flex" flexWrap="wrap">
      <Box mr={4}>
        <Field
          name="bgDesktop"
          label="Background Image: Desktop"
          component={FormHeroImage}
          width={1920}
          required
          sourceImg={initialValues.bgDesktop}
          setFieldValue={setFieldValue}
        />
      </Box>
      <Box mr={4}>
        <Field
          name="bgTabletLandscape"
          label="Background Image: Tablet Landscape"
          component={FormHeroImage}
          width={991}
          sourceImg={initialValues.bgTabletLandscape}
          setFieldValue={setFieldValue}
        />
      </Box>
      <Box mr={4}>
        <Field
          name="bgTabletPortrait"
          label="Background Image: Tablet Portrait"
          component={FormHeroImage}
          width={668}
          sourceImg={initialValues.bgTabletPortrait}
          setFieldValue={setFieldValue}
        />
      </Box>
      <Box mr={4}>
        <Field
          name="bgMobilePortrait"
          label="Background Image: Mobile"
          component={FormHeroImage}
          width={414}
          sourceImg={initialValues.bgMobilePortrait}
          setFieldValue={setFieldValue}
        />
      </Box>
      <Box mr={4}>
        <Field
          name="logo"
          label="Image: Logo"
          component={FormHeroImage}
          width={400}
          required
          sourceImg={initialValues.logo}
          setFieldValue={setFieldValue}
        />
      </Box>
    </Box>
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

TakeoverForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
  initialValues: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func
}

export default TakeoverForm
