import React, { useCallback, useState } from 'react'
import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import DeleteIcon from '@material-ui/icons/Delete'
import FormHelperText from '@material-ui/core/FormHelperText'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { useDropzone } from 'react-dropzone'
import { withStyles } from '@material-ui/core/styles'

import styles from './styles'

export const FileDropzone = ({ classes, field, form, label }) => {
  const [image, setImage] = useState(null)
  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles[0]) {
      form.setFieldValue(field.name, acceptedFiles[0])
      const reader = new FileReader()
      reader.onload = function (e) {
        setImage(e.target.result)
      }
      reader.readAsDataURL(acceptedFiles[0]);
    }
  }, [field, form])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const currentImageUrl = image || field.value

  const handleClearImage = () => {
    setImage(null)
    form.setFieldValue(field.name, null)
  }

  const error = form.touched[field.name] && form.errors[field.name]

  return (
    <div className={classes.root}>
      {label && <FormHelperText className={classes.label}>{label}</FormHelperText>}
      {currentImageUrl && (
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item>
            <img src={currentImageUrl} alt="" className={classes.image} />
          </Grid>
          <Grid item xs>
            <Button variant="outlined" color="secondary" onClick={handleClearImage}>
              <DeleteIcon /> Clear
            </Button>
          </Grid>
        </Grid>
      )}
      <div {...getRootProps()} className={classes.dropzone}>
        <input {...getInputProps()} />
        <CloudUploadIcon className={classes.icon} />
        {
          isDragActive ? (
            <Typography variant="caption">Drop an image here ...</Typography>
          ) : (
            <Typography variant="caption">Drag 'n' drop an image here, or click to select a file</Typography>
          )
        }
      </div>
      {Boolean(error) && (
        <FormHelperText error>{error}</FormHelperText>
      )}
    </div>
  )
}

export default withStyles(styles)(FileDropzone)
