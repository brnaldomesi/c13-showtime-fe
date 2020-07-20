import React, { useEffect } from 'react'
import TakeoverForm, { validationSchema } from './components/TakeoverForm'
import {
  getTakeover,
  takeoverLoadingSelector,
  takeoverSelector,
  takeoverUpdatingSelector,
  updateTakeover
} from 'redux/modules/takeover'

import Breadcrumbs from 'components/Breadcrumbs'
import { Formik } from 'formik'
import LoadingIndicator from 'components/LoadingIndicator'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import { SNACKBAR_TYPE } from 'config/constants'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { formSubmit } from 'utils/form'
import { makeStyles } from '@material-ui/core/styles'
import styles from './styles'
import { useSnackbar } from 'notistack'

const useStyles = makeStyles(styles)

const initialValues = {
  headline: '',
  subHeadline: '',
  backgroundImgUrl: '',
  logoImgUrl: ''
}

const Takeover = ({ takeover, takeoverLoading, takeoverUpdating, getTakeover, updateTakeover }) => {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (takeover === null) {
      getTakeover({
        fail: () => enqueueSnackbar('Failed to load all takeover!', { variant: SNACKBAR_TYPE.ERROR })
      })
    }
  }, [getTakeover, enqueueSnackbar, takeover])

  const handleSubmit = (values, actions) => {
    return formSubmit(
      updateTakeover,
      {
        data: values,
        success: () => {
          enqueueSnackbar('Saved successfully!', { variant: SNACKBAR_TYPE.SUCCESS })
        },
        fail: () => enqueueSnackbar('Failed to save takeover!', { variant: SNACKBAR_TYPE.ERROR })
      },
      actions
    )
  }

  return (
    <div className={classes.root}>
      <Breadcrumbs />
      <Typography variant="h6" gutterBottom>
        Show Hub Takeover
      </Typography>
      <Paper className={classes.paper}>
        {takeoverLoading || takeoverUpdating ? (
          <LoadingIndicator />
        ) : (
          <Formik
            initialValues={initialValues}
            validateOnChange={false}
            validateOnBlur
            onSubmit={handleSubmit}
            validationSchema={validationSchema}>
            {formikProps => <TakeoverForm {...formikProps} />}
          </Formik>
        )}
      </Paper>
    </div>
  )
}

Takeover.propTypes = {
  getTakeover: PropTypes.func.isRequired,
  updateTakeover: PropTypes.func.isRequired
}

const selector = createStructuredSelector({
  takeover: takeoverSelector,
  takeoverLoading: takeoverLoadingSelector,
  takeoverUpdating: takeoverUpdatingSelector
})

const actions = {
  getTakeover,
  updateTakeover
}

export default connect(selector, actions)(Takeover)
