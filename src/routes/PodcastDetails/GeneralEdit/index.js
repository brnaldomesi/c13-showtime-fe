import React from 'react'
import { Formik, Field } from 'formik'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import * as Yup from 'yup'

import FileDropzone from 'components/FileDropzone'
import FormLockerInput from 'components/FormLockerInput'
import Hr from 'components/Hr'

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Podcast title is required'),
  summary: Yup.string().required('Summary is required'),
  slug: Yup.string().required('Slug is required'),
});

const renderForm = (props) => (
  <form onSubmit={props.handleSubmit}>
    <Field
      name="title"
      label="Podcast Title"
      component={FormLockerInput}
      placeholder="Enter the podcast title here..."
      lockerName="locked"
      lockerValue="title"
    />
    <Field
      name="subtitle"
      label="Subtitle"
      component={FormLockerInput}
      placeholder="Enter the podcast subtitle here..."
      lockerName="locked"
      lockerValue="subtitle"
    />
    <Field
      name="summary"
      label="Summary"
      component={FormLockerInput}
      multiline
      rows={6}
      placeholder="e.g. pod-save-america ..."
      lockerName="locked"
      lockerValue="summary"
    />
    <Field
      name="slug"
      label="Slug"
      component={FormLockerInput}
      placeholder="e.g. pod-save-america ..."
      lockerName="locked"
      lockerValue="slug"
    />
    <Field
      name="websiteUrl"
      label="Website URL"
      component={FormLockerInput}
      placeholder="e.g. https://crooked.com/..."
      lockerName="locked"
      lockerValue="websiteUrl"
    />
    <Field
      name="image"
      label="Image"
      component={FileDropzone}
    />
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

const GeneralEdit = ({ podcastDetails, onSubmit }) => {
  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(true)
    await onSubmit(values)
    actions.setSubmitting(false)
  }

  const initialValues = podcastDetails ? { ...podcastDetails, image: podcastDetails.imageUrl } : {}
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      render={renderForm}
      validationSchema={validationSchema}
    />
  )
}

GeneralEdit.propTypes = {
  podcastDetails: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default GeneralEdit
