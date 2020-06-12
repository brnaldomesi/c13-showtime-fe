import Autocomplete from '@material-ui/lab/Autocomplete'
import Chip from '@material-ui/core/Chip'
import FormHelperText from '@material-ui/core/FormHelperText'
import MenuItem from '@material-ui/core/MenuItem'
import PropTypes from 'prop-types'
import React from 'react'
import { TextField } from '@material-ui/core'
import ThumbnailImage from 'components/ThumbnailImage'
import cn from 'classnames'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import styles from './styles'
import { withStyles } from '@material-ui/core/styles'

const FormAutoComplete = ({
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
        renderOption={(option, { inputValue, selected }) => {
          const matches = match(option.title, inputValue)
          const parts = parse(option.title, matches)

          return (
            <MenuItem selected={selected} component="div">
              <ThumbnailImage imageUrls={option.imageUrls.original} className={classes.suggestionImage} />
              <div className={classes.suggestionText}>
                {parts.map(part => (
                  <span key={part.text} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                    {part.text}
                  </span>
                ))}
              </div>
            </MenuItem>
          )
        }}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              classes={{
                root: classes.chipRoot,
                avatar: classes.chipAvatar
              }}
              avatar={<ThumbnailImage imageUrls={option.imageUrls.original} />}
              label={option.title}
              {...getTagProps({ index })}
            />
          ))
        }
      />
      {Boolean(error) && <FormHelperText error>{error}</FormHelperText>}
    </div>
  )
}

FormAutoComplete.propTypes = {
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

export default withStyles(styles)(FormAutoComplete)
