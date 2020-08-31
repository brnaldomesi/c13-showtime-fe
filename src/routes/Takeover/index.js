import React, { useCallback, useEffect, useState } from 'react'
import TakeoverForm, { validationSchema } from './components/TakeoverForm'
import {
  getTakeover,
  presignedPost,
  presignedPostingSelector,
  takeoverLoadingSelector,
  takeoverUpdatingSelector,
  updateTakeover,
  uploadToS3,
  uploadingSelector
} from 'redux/modules/takeover'

import Breadcrumbs from 'components/Breadcrumbs'
import { Formik } from 'formik'
import LoadingIndicator from 'components/LoadingIndicator'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import { SNACKBAR_TYPE } from 'config/constants'
import Typography from '@material-ui/core/Typography'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { formSubmit } from 'utils/form'
import { makeStyles } from '@material-ui/core/styles'
import styles from './styles'
import { useSnackbar } from 'notistack'
import { userIsAuthenticatedRedir } from 'hocs/withAuth'
import { withRouter } from 'react-router'

const useStyles = makeStyles(styles)

const initialValues = {
  headline: '',
  subHeadline: '',
  bgDesktop: null,
  bgMobilePortrait: null,
  bgTabletLandscape: null,
  bgTabletPortrait: null,
  logo: null
}

const imagesTypeList = ['bgDesktop', 'bgMobilePortrait', 'bgTabletLandscape', 'bgTabletPortrait', 'logo']

const Takeover = ({
  takeoverLoading,
  takeoverUpdating,
  getTakeover,
  updateTakeover,
  presignedPosting,
  presignedPost,
  uploadToS3,
  uploading
}) => {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const [formValues, setFormValues] = useState(initialValues)
  const getTakeoverCall = useCallback(() => {
    getTakeover({
      success: res => {
        setFormValues({
          headline: res.headline,
          subHeadline: res.subHeadline,
          bgDesktop: res.images.bgDesktop ? res.images.bgDesktop.sizes.original : initialValues.bgDesktop,
          bgMobilePortrait: res.images.bgMobilePortrait
            ? res.images.bgMobilePortrait.sizes.original
            : initialValues.bgMobilePortrait,
          bgTabletLandscape: res.images.bgTabletLandscape
            ? res.images.bgTabletLandscape.sizes.original
            : initialValues.bgTabletLandscape,
          bgTabletPortrait: res.images.bgTabletPortrait
            ? res.images.bgTabletPortrait.sizes.original
            : initialValues.bgTabletPortrait,
          logo: res.images.logo ? res.images.logo.sizes.original : initialValues.logo
        })
      },
      fail: () => enqueueSnackbar('Failed to load all takeover!', { variant: SNACKBAR_TYPE.ERROR })
    })
  }, [getTakeover, enqueueSnackbar])

  useEffect(() => {
    getTakeoverCall()
  }, [getTakeoverCall])

  const handleSubmit = (values, actions) => {
    const data = imagesTypeList
      .filter(imageType => values[imageType] && values[imageType] !== formValues[imageType])
      .map(imageType => ({
        file: values[imageType],
        imageType
      }))

    const updateTakeoverData = {
      headline: values.headline,
      subHeadline: values.subHeadline,
      images: {}
    }

    imagesTypeList
      .filter(imageType => values[imageType] === null)
      .forEach(imageType => {
        updateTakeoverData.images[imageType] = {}
        updateTakeoverData.images[imageType].sourceUrl = ''
      })

    actions.setSubmitting(true)

    const presignedPostPromises = data.map(
      ({ file, imageType }) =>
        new Promise((resolve, reject) => {
          const data = {
            fileName: file.name,
            contentType: file.type,
            imageType
          }

          presignedPost({
            data,
            success: res => {
              const imageData = new FormData()
              Object.keys(res.formData.fields).forEach(key => imageData.append(key, res.formData.fields[key]))
              imageData.append('file', values[imageType])

              uploadToS3({
                path: res.formData.url,
                data: imageData,
                success: () =>
                  resolve({
                    imageType,
                    sourceUrl: res.location
                  }),
                fail: () =>
                  reject({
                    type: 'upload s3',
                    value: imageType
                  })
              })
            },
            fail: () =>
              reject({
                type: 'presigned post',
                value: imageType
              })
          })
        })
    )

    Promise.allSettled(presignedPostPromises).then(results => {
      results.forEach(res => {
        if (res.status === 'fulfilled') {
          const { imageType, sourceUrl } = res.value
          updateTakeoverData.images[imageType] = {}
          updateTakeoverData.images[imageType].sourceUrl = sourceUrl
        } else if (res.status === 'rejected') {
          const { type, value: imageType } = res.value
          if (type === 'upload s3') {
            enqueueSnackbar(`Failed to upload ${imageType} image to s3 bucket`, { variant: SNACKBAR_TYPE.ERROR })
          } else if (type === 'presigned post') {
            enqueueSnackbar(`Failed to get authorization to upload ${imageType} image`, {
              variant: SNACKBAR_TYPE.ERROR
            })
          }
        }
      })

      return formSubmit(
        updateTakeover,
        {
          data: updateTakeoverData,
          success: () => {
            enqueueSnackbar('Saved successfully!', { variant: SNACKBAR_TYPE.SUCCESS })
            getTakeoverCall()
          }
        },
        actions
      )
    })
  }

  return (
    <div className={classes.root}>
      <Breadcrumbs />
      <Typography variant="h6" gutterBottom>
        Show Hub Takeover
      </Typography>
      <Paper className={classes.paper}>
        {takeoverLoading || takeoverUpdating || presignedPosting || uploading ? (
          <LoadingIndicator />
        ) : (
          <Formik
            initialValues={formValues}
            validateOnChange
            validateOnBlur
            onSubmit={handleSubmit}
            enableReinitialize
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
  updateTakeover: PropTypes.func.isRequired,
  presignedPost: PropTypes.func.isRequired,
  uploadToS3: PropTypes.func.isRequired
}

const selector = createStructuredSelector({
  takeoverLoading: takeoverLoadingSelector,
  takeoverUpdating: takeoverUpdatingSelector,
  presignedPosting: presignedPostingSelector,
  uploading: uploadingSelector
})

const actions = {
  getTakeover,
  updateTakeover,
  presignedPost,
  uploadToS3
}

export default compose(userIsAuthenticatedRedir, withRouter, connect(selector, actions))(Takeover)
