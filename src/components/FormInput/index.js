import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'

const FormInput = ({ className, field, form, fullWidth, label, multiline, placeholder, rows, type, variant }) => {
  const error = form.touched[field.name] && form.errors[field.name]
  return (
    <TextField
      label={label}
      className={className}
      name={field.name}
      value={field.value || ''}
      onChange={field.onChange}
      onBlur={field.onBlur}
      variant={variant}
      type={type}
      multiline={multiline}
      placeholder={placeholder}
      fullWidth={fullWidth}
      error={Boolean(error)}
      helperText={error}
      margin="normal"
      rows={rows}
      InputLabelProps={{
        shrink: placeholder && label ? true : undefined
      }}
    />
  )
}

FormInput.propTypes = {
  className: PropTypes.string,
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  fullWidth: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  multiline: PropTypes.bool,
  type: PropTypes.string,
  variant: PropTypes.string
}

FormInput.defaultProps = {
  fullWidth: true,
  type: 'text',
  variant: 'outlined'
}

export default FormInput
