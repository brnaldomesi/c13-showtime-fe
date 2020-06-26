import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import React, { useEffect, useState } from 'react'

import Autocomplete from '@material-ui/lab/Autocomplete'
import Chip from '@material-ui/core/Chip'
import FormHelperText from '@material-ui/core/FormHelperText'
import MenuItem from '@material-ui/core/MenuItem'
import PropTypes from 'prop-types'
import { TextField } from '@material-ui/core'
import ThumbnailImage from 'components/ThumbnailImage'
import cn from 'classnames'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import { reorder } from 'utils/helpers'
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
  const [podcasts, setPodcasts] = useState(value)

  useEffect(() => {
    setPodcasts(value)
  }, [value])

  const handleOnDragEnd = result => {
    if (!result.destination) {
      return
    }
    const orderedArr = reorder(podcasts, result.source.index, result.destination.index)
    setPodcasts(orderedArr)
    onChange(null, orderedArr)
  }

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
        renderInput={params => (
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="droppable" direction="horizontal">
              {provided => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <TextField {...params} variant={variant} error={Boolean(error)} />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
        disabled={disabled}
        value={podcasts}
        getOptionSelected={(option, value) => value.id === option.id}
        renderOption={(option, { inputValue, selected }) => {
          const matches = match(option[optionLabel], inputValue)
          const parts = parse(option[optionLabel], matches)

          return (
            <MenuItem selected={selected} component="div">
              <ThumbnailImage imageUrls={option.imageUrl} className={classes.suggestionImage} />
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
            <Draggable key={option.id} draggableId={option.id} index={index}>
              {provided => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                  <Chip
                    classes={{
                      root: classes.chipRoot,
                      avatar: classes.chipAvatar
                    }}
                    avatar={<ThumbnailImage imageUrls={option.imageUrl} />}
                    label={option[optionLabel]}
                    {...getTagProps({ index })}
                  />
                </div>
              )}
            </Draggable>
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
