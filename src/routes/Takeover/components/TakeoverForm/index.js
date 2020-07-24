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
  backgroundImg: Yup.string().required('Background img is required'),
  logoImg: Yup.string().required('Logo img is required')
})

const TakeoverForm = ({ handleSubmit, isValid, initialValues, setFieldValue }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexWrap="wrap">
        <Box mr={4}>
          <Field
            name="backgroundImg"
            label="Background Image: Desktop"
            component={FormHeroImage}
            width={1920}
            required
            sourceImg={initialValues.backgroundImg}
            setFieldValue={setFieldValue}
          />
        </Box>
        <Box mr={4}>
          <Field
            name="tabletLandscapeImg"
            label="Background Image: Tablet Landscape"
            component={FormHeroImage}
            width={991}
            setFieldValue={setFieldValue}
          />
        </Box>
        <Box mr={4}>
          <Field
            name="tabletPortraitImg"
            label="Background Image: Tablet Portrait"
            component={FormHeroImage}
            width={668}
            setFieldValue={setFieldValue}
          />
        </Box>
        <Box mr={4}>
          <Field
            name="mobileImg"
            label="Background Image: Mobile"
            component={FormHeroImage}
            width={414}
            setFieldValue={setFieldValue}
          />
        </Box>
        <Box mr={4}>
          <Field
            name="logoImg"
            label="Image: Logo"
            component={FormHeroImage}
            width={400}
            required
            sourceImg={initialValues.logoImg}
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
}

TakeoverForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
  initialValues: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func
}

export default TakeoverForm
