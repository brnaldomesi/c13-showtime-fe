import React, { useEffect, useRef, useState } from 'react'

import AddIcon from '@material-ui/icons/Add'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import FormHelperText from '@material-ui/core/FormHelperText'
import IconButton from '@material-ui/core/IconButton'
import PropTypes from 'prop-types'
import { confirmAndDeleteImg } from 'redux/modules/takeover'
import { connect } from 'react-redux'
import grey from '@material-ui/core/colors/grey'
import { makeStyles } from '@material-ui/core/styles'
import styles from './styles'

const grey300 = grey[300]
const useStyles = makeStyles(styles)

const FormHeroImage = ({ required, width, field, form, label, setFieldValue, sourceImg, confirmAndDeleteImg }) => {
  const error = form.touched[field.name] && form.errors[field.name]
  const classes = useStyles()
  const [imgSrc, setImgSrc] = useState(sourceImg)
  const [invalidImage, setInvalidImage] = useState(null)
  const fileInput = useRef(null)

  useEffect(() => {
    setImgSrc(sourceImg)
  }, [sourceImg])

  const handleChange = event => {
    const imageFile = event.target.files[0]
    if (!imageFile) {
      return false
    }

    const reader = new FileReader()
    reader.readAsDataURL(imageFile)

    reader.onload = e => {
      const img = new Image()
      img.src = URL.createObjectURL(imageFile)

      img.onload = imgEvent => {
        if (imgEvent.target.naturalWidth !== width) {
          setInvalidImage('Invalid image width.')
          return false
        }
        setInvalidImage(null)
      }

      img.onerror = () => {
        setInvalidImage('Invalid image content.')
        return false
      }
    }

    reader.onloadend = e => {
      setFieldValue(field.name, imageFile)
      setImgSrc(URL.createObjectURL(imageFile))
    }
  }

  const handleDelete = () => {
    if (imgSrc !== null) {
      confirmAndDeleteImg({
        success: () => {
          clearImg()
        }
      })
    }
  }

  const clearImg = () => {
    fileInput.current.value = null
    setImgSrc(null)
    setFieldValue(field.name, null)
  }

  return (
    <div>
      {label && (
        <Box mb={1} width={330}>
          <FormHelperText>{label}</FormHelperText>
        </Box>
      )}
      <Box bgcolor={grey300} className={classes.root}>
        <img src={imgSrc} className={classes.heroImage} alt="" />
        <Box className={classes.imageButtonGroup}>
          <IconButton className={classes.deleteButton} onClick={handleDelete}>
            <DeleteIcon color="action" />
          </IconButton>
          <Button className={classes.addButton} component="label">
            <input
              type="file"
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleChange}
              name={field.name}
              ref={fileInput}
            />
            <AddIcon color="action" />
          </Button>
        </Box>
      </Box>
      <Box mb={3} width={330}>
        {required && <FormHelperText>*Required</FormHelperText>}
        <FormHelperText>Width: {width}px</FormHelperText>
        {Boolean(error) && <FormHelperText error>{error}</FormHelperText>}
        {Boolean(invalidImage) && <FormHelperText error>{invalidImage}</FormHelperText>}
      </Box>
    </div>
  )
}

FormHeroImage.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  required: PropTypes.bool,
  label: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  sourceImg: PropTypes.string
}

const actions = {
  confirmAndDeleteImg
}

export default connect(null, actions)(FormHeroImage)
