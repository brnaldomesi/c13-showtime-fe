import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Formik, Field } from 'formik'
import { Link, withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { useSnackbar } from 'notistack'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import * as Yup from 'yup'

import FormInput from 'components/FormInput'
import FormTagsInput from 'components/FormTagsInput'
import Hr from 'components/Hr'
import LoadingIndicator from 'components/LoadingIndicator'
import {
  episodeDetailsSelector,
  episodeDetailsLoadingSelector,
  getEpisodeDetails,
  updateEpisodeDetails
} from 'redux/modules/episode'
import { deserializeEpisode, serializeEpisode } from 'utils/serializers'
import { formSubmit } from 'utils/form'
import { SNACKBAR_TYPE } from 'config/constants'
import styles from './styles'

const useStyles = makeStyles(styles)

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Podcast title is required'),
  summary: Yup.string().required('Summary is required')
})

const renderForm = withRouter(props => (
  <form onSubmit={props.handleSubmit}>
    <Field name="title" label="Episode Title" component={FormInput} placeholder="Enter the episode title here..." />
    <Field
      name="summary"
      label="Summary"
      component={FormInput}
      multiline
      rows={6}
      placeholder="e.g. pod-save-america ..."
    />
    <Field name="tags" label="Tags" placeholder="Enter episode tags here..." component={FormTagsInput} />
    <Hr />
    <Grid container justify="flex-end" spacing={2}>
      <Grid item>
        <Button
          color="primary"
          type="submit"
          component={Link}
          to={`/podcasts/${props.match.params.podcastId}/episodes`}>
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
))

const EpisodeEdit = ({ getEpisodeDetails, episode, updateEpisodeDetails, history, loading, match }) => {
  const { episodeId, podcastId } = match.params
  const { enqueueSnackbar } = useSnackbar()
  const classes = useStyles()
  const handleSubmit = (values, actions) => {
    return formSubmit(
      updateEpisodeDetails,
      {
        podcastId,
        episodeId,
        data: serializeEpisode(values),
        success: () => history.push(`/podcasts/${podcastId}/episodes`),
        fail: () => enqueueSnackbar('Failed to save the episode details.', { variant: SNACKBAR_TYPE.ERROR })
      },
      actions
    )
  }

  useEffect(() => {
    getEpisodeDetails({ episodeId, podcastId })
  }, [episodeId, podcastId, getEpisodeDetails])

  const initialValues = episode ? deserializeEpisode(episode) : {}
  return loading ? (
    <LoadingIndicator />
  ) : (
    <Paper className={classes.paper}>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handleSubmit}
        render={renderForm}
        podcastId={podcastId}
        validationSchema={validationSchema}
      />
    </Paper>
  )
}

EpisodeEdit.propTypes = {
  episode: PropTypes.object,
  getEpisodeDetails: PropTypes.func.isRequired,
  updateEpisodeDetails: PropTypes.func.isRequired
}

const selector = createStructuredSelector({
  episode: episodeDetailsSelector,
  loading: episodeDetailsLoadingSelector
})

const actions = {
  getEpisodeDetails,
  updateEpisodeDetails
}

export default connect(
  selector,
  actions
)(EpisodeEdit)
