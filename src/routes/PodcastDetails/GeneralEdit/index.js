import React from 'react'
import { Formik, Field } from 'formik'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import * as Yup from 'yup'

import { deserializePodcast, serializePodcast } from 'utils/serializers'
// import FileDropzone from 'components/FileDropzone'
import FormCheckbox from 'components/FormCheckbox'
import FormLockerInput from 'components/FormLockerInput'
import FormTagsInput from 'components/FormTagsInput'
import Hr from 'components/Hr'
import LoadingIndicator from 'components/LoadingIndicator'

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Podcast title is required'),
  summary: Yup.string().required('Summary is required'),
  slug: Yup.string().required('Slug is required'),
  websiteUrl: Yup.string()
    .url('Must be a valid URL')
    .required('Website URL is required')
})

const renderForm = props => (
  <form onSubmit={props.handleSubmit}>
    <Field
      name="title"
      label="Podcast Title"
      component={FormLockerInput}
      placeholder="Enter the podcast title here..."
      lockerName="config.lockedSyncFields"
      lockerValue="title"
    />
    <Field
      name="summary"
      label="Summary"
      component={FormLockerInput}
      multiline
      rows={6}
      placeholder="Enter podcast summary here..."
      lockerName="config.lockedSyncFields"
      lockerValue="summary"
    />
    <Field
      name="slug"
      label="Slug"
      component={FormLockerInput}
      placeholder="e.g. pod-save-america ..."
      lockerName="config.lockedSyncFields"
      lockerValue="slug"
    />
    <Field
      name="websiteUrl"
      label="Website URL"
      component={FormLockerInput}
      placeholder="e.g. https://crooked.com/..."
      lockerName="config.lockedSyncFields"
      lockerValue="websiteUrl"
    />
    {/* <Field
      name="image"
      label="Image"
      component={FileDropzone}
    /> */}
    <Field
      name="tags"
      label="Tags"
      placeholder="Enter podcast tags here..."
      component={FormTagsInput}
      lockerName="config.lockedSyncFields"
      lockerValue="tags"
    />
    <Field name="config.enableShowPage" label="Active" toggleValues={[false, true]} component={FormCheckbox} />
    <Hr />
    <Field name="seoTitle" label="SEO Title" component={FormLockerInput} placeholder="Enter SEO title here..." />
    <Field name="seoHeader" label="SEO Header" component={FormLockerInput} placeholder="Enter SEO header here..." />
    <Field
      name="seoDescription"
      label="SEO Description"
      component={FormLockerInput}
      multiline
      rows={5}
      placeholder="Enter SEO description here..."
    />
    <Hr />
    <Grid container justify="flex-end" spacing={2}>
      <Grid item>
        <Button color="primary" type="submit" component={Link} to="/podcasts">
          Cancel
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" type="submit">
          Save Changes
        </Button>
      </Grid>
    </Grid>
    {props.isSubmitting && <LoadingIndicator />}
  </form>
)

const GeneralEdit = ({ podcastDetails, onSubmit }) => {
  const handleSubmit = (values, actions) => {
    onSubmit(serializePodcast(values), actions)
  }

  const initialValues = podcastDetails ? deserializePodcast(podcastDetails) : {}
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={handleSubmit}
      render={renderForm}
      validationSchema={validationSchema}
    />
  )
}

GeneralEdit.propTypes = {
  podcastDetails: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default GeneralEdit
