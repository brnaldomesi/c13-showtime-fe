import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import PropTypes from 'prop-types'

const FormInput = ({ color, field, form, label, toggleValues }) => {
  const error = form.touched[field.name] && form.errors[field.name]
  const handleChange = event => {
    form.setFieldValue(field.name, event.target.checked ? toggleValues[1] : toggleValues[0])
  }

  const handleBlur = event => {
    form.setFieldValue(field.name, event.target.checked ? toggleValues[1] : toggleValues[0])
  }

  return (
    <FormControl error={Boolean(error)}>
      <FormControlLabel
        control={
          <Checkbox
            checked={field.value === toggleValues[1]}
            onChange={handleChange}
            onBlur={handleBlur}
            color={color}
          />
        }
        label={label}
      />
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}

FormInput.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  label: PropTypes.string,
  toggleValues: PropTypes.array
}

FormInput.defaultProps = {
  color: 'primary',
  toggleValues: [false, true]
}

export default FormInput
