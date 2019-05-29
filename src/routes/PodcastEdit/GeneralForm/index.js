import React from 'react'
import { Formik, Field } from 'formik'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'

import FormInput from 'components/FormInput'
import Hr from 'components/Hr'

const renderForm = (props) => (
  <form onSubmit={props.handleSubmit}>
    <Field name="title" label="Podcast Title" component={FormInput} placeholder="Enter the podcast title here..." />
    <Field name="subtitle" label="Subtitle" component={FormInput} placeholder="Enter the podcast subtitle here..." />
    <Field name="summary" label="Summary" component={FormInput} multiline rows={8} />
    <Field name="slug" label="Slug" component={FormInput} placeholder="e.g. pod-save-america ..." />
    <Field name="websiteUrl" label="Website URL" component={FormInput} placeholder="e.g. https://crooked.com/..." />
    <Hr />
    <Grid container justify="flex-end" spacing={2}>
      <Grid item>
        <Button color="primary" type="submit" component={Link} to="/podcasts">Cancel</Button>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" type="submit">Save Changes</Button>
      </Grid>
    </Grid>
  </form>
)

const GeneralForm = ({ initialValues, onSubmit }) => {
  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(true)
    await onSubmit(values)
    actions.setSubmitting(false)
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      render={renderForm}
    />
  )
}

GeneralForm.propTypes = {
  classes: PropTypes.object.isRequired,
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default GeneralForm
