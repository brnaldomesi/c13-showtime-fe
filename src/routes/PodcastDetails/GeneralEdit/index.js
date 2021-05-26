import * as Yup from 'yup'

import { Field, Formik } from 'formik'
import { deserializePodcast, serializePodcast } from 'utils/serializers'

import Button from '@material-ui/core/Button'
import FormAutocomplete from 'components/FormAutocomplete'
// import FileDropzone from 'components/FileDropzone'
import FormCheckbox from 'components/FormCheckbox'
import FormLockerInput from 'components/FormLockerInput'
import FormTagsInput from 'components/FormTagsInput'
import Grid from '@material-ui/core/Grid'
import Hr from 'components/Hr'
import { Link } from 'react-router-dom'
import LoadingIndicator from 'components/LoadingIndicator'
import PropTypes from 'prop-types'
import React from 'react'

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Podcast title is required'),
  summary: Yup.string().required('Summary is required'),
  slug: Yup.string().required('Slug is required'),
  websiteUrl: Yup.string()
    .url('Must be a valid URL')
    .required('Website URL is required')
})

const RenderForm = ({ handleSubmit, values, categories, isSubmitting, setFieldValue }) => {
  const handleCategoriesChange = (event, categories) => {
    setFieldValue('categories', categories)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="config.enableShowPage"
        label="Display on Show Hub"
        toggleValues={[false, true]}
        component={FormCheckbox}
      />
      <Field
        name="config.enableShowHub"
        label="Make Searchable on Show Hub"
        toggleValues={[false, true]}
        component={FormCheckbox}
      />
      <Field name="config.enablePlayer" label="Enable Player" toggleValues={[false, true]} component={FormCheckbox} />
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
      <Hr />
      <Field name="seoTitle" label="SEO Title" component={FormLockerInput} placehol der="Enter SEO title here..." />
      <Field name="seoHeader" label="SEO Header" component={FormLockerInput} placeholder="Enter SEO header here..." />
      <Field
        name="seoDescription"
        label="SEO Description"
        component={FormLockerInput}
        multiline
        rows={5}
        placeholder="Enter SEO description here..."
      />
      {values.categories && (
        <Field
          id="categories"
          name="categories"
          label="Categories"
          component={FormAutocomplete}
          options={categories}
          optionLabel="name"
          onChange={handleCategoriesChange}
          value={values.categories}
          variant="outlined"
          multiple
        />
      )}
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
      {isSubmitting && <LoadingIndicator />}
    </form>
  )
}

const GeneralEdit = ({ podcastDetails, onSubmit, categories }) => {
  const handleSubmit = (values, actions) => {
    return onSubmit(serializePodcast(values), actions)
  }

  const initialValues = podcastDetails ? deserializePodcast(podcastDetails) : {}
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={handleSubmit}
      validationSchema={validationSchema}>
      {formikProps => <RenderForm {...formikProps} categories={categories} />}
    </Formik>
  )
}

GeneralEdit.propTypes = {
  podcastDetails: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default GeneralEdit
