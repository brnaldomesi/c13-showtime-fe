import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import cn from 'classnames'
import Divider from '@material-ui/core/Divider'
import FormHelperText from '@material-ui/core/FormHelperText'
import get from 'lodash/get'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import LockIcon from '@material-ui/icons/Lock'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import PropTypes from 'prop-types'
import xor from 'lodash/xor'

import styles from './styles'

const FormLockerInput = ({
  label,
  classes,
  className,
  field,
  form,
  lockerName,
  lockerValue,
  placeholder,
  multiline,
  type,
  rows
}) => {
  const handleToggle = () => {
    const lockerValues = get(form.values, lockerName) || []
    form.setFieldValue(lockerName, xor(lockerValues, [lockerValue]))
  }

  const error = form.touched[field.name] && form.errors[field.name]

  return (
    <div className={cn(classes.root, className)}>
      {label && <FormHelperText className={classes.label}>{label}</FormHelperText>}
      <div className={classes.inputRow}>
        <IconButton onClick={handleToggle} className={classes.iconButton}>
          {(get(form.values, lockerName) || []).includes(lockerValue) ? (
            <LockIcon color="primary" />
          ) : (
            <LockOpenIcon color="inherit" />
          )}
        </IconButton>
        <Divider className={classes.divider} />
        <InputBase
          className={classes.input}
          rows={rows}
          type={type}
          multiline={multiline}
          placeholder={placeholder}
          {...field}
          value={field.value || ''}
        />
      </div>
      {Boolean(error) && <FormHelperText error>{error}</FormHelperText>}
    </div>
  )
}

FormLockerInput.propTypes = {
  className: PropTypes.string,
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  multiline: PropTypes.bool,
  placeholder: PropTypes.string,
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  lockerName: PropTypes.string.isRequired,
  lockerValue: PropTypes.string.isRequired,
  type: PropTypes.string
}

export default withStyles(styles)(FormLockerInput)
