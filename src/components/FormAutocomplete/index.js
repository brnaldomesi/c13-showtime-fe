import Autocomplete from '@material-ui/lab/Autocomplete'
import FormHelperText from '@material-ui/core/FormHelperText'
import PropTypes from 'prop-types'
import React from 'react'
import { TextField } from '@material-ui/core'
import cn from 'classnames'
import styles from './styles'
import { withStyles } from '@material-ui/core/styles'

const FormAutocomplete = ({
  label,
  classes,
  className,
  field,
  form,
  options,
  value,
  optionLabel,
  multiple,
  onChange,
  variant,
  disabled
}) => {
  const error = form.touched[field.name] && form.errors[field.name]

  return (
    <div className={cn(classes.root, className)}>
      {label && <FormHelperText className={classes.label}>{label}</FormHelperText>}
      <Autocomplete
        multiple={multiple}
        options={options}
        getOptionLabel={option => option[optionLabel]}
        onChange={onChange}
        onBlur={field.onBlur}
        id={field.name}
        renderInput={params => <TextField {...params} variant={variant} error={Boolean(error)} />}
        disabled={disabled}
        value={value}
        getOptionSelected={(option, value) => value.id === option.id}
      />
      {Boolean(error) && <FormHelperText error>{error}</FormHelperText>}
    </div>
  )
}

FormAutocomplete.propTypes = {
  className: PropTypes.string,
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  lockerName: PropTypes.string,
  lockerValue: PropTypes.string,
  onChange: PropTypes.func,
  variant: PropTypes.string,
  disabled: PropTypes.bool,
  options: PropTypes.array.isRequired,
  value: PropTypes.array
}

export default withStyles(styles)(FormAutocomplete)
