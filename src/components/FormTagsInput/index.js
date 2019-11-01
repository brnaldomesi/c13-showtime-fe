import React, { useRef, useState, useCallback } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useDrag, useDrop } from 'react-dnd'
import CancelIcon from '@material-ui/icons/Cancel'
import Chip from '@material-ui/core/Chip'
import cn from 'classnames'
import CreatableSelect from 'react-select/creatable'
import Divider from '@material-ui/core/Divider'
import FormHelperText from '@material-ui/core/FormHelperText'
import get from 'lodash/get'
import IconButton from '@material-ui/core/IconButton'
import LockIcon from '@material-ui/icons/Lock'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import uniq from 'lodash/uniq'
import xor from 'lodash/xor'

import styles from './styles'

// In case we need to support suggestions with async loading
const suggestions = [].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label
}))

const useStyles = makeStyles(styles)

function NoOptionsMessage(props) {
  return (
    <Typography color="textSecondary" className={props.selectProps.classes.noOptionsMessage} {...props.innerProps}>
      {props.children}
    </Typography>
  )
}

NoOptionsMessage.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />
}

inputComponent.propTypes = {
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
}

function Control(props) {
  const {
    children,
    innerProps,
    innerProps: { onMouseDown },
    innerRef,
    selectProps: { classes, TextFieldProps }
  } = props

  const handleMouseDown = useCallback(
    event => {
      if (!event.target.closest('.tagChip')) {
        onMouseDown(event)
      }
    },
    [onMouseDown]
  )

  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        disableUnderline: true,
        inputProps: {
          className: classes.input,
          ref: innerRef,
          children,
          ...innerProps,
          onMouseDown: handleMouseDown
        }
      }}
      {...TextFieldProps}
    />
  )
}

Control.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  selectProps: PropTypes.object.isRequired
}

function Option(props) {
  return (
    <MenuItem
      ref={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400
      }}
      {...props.innerProps}>
      {props.children}
    </MenuItem>
  )
}

Option.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  isFocused: PropTypes.bool,
  isSelected: PropTypes.bool
}

function Placeholder(props) {
  return (
    <Typography color="textSecondary" className={props.selectProps.classes.placeholder} {...props.innerProps}>
      {props.children}
    </Typography>
  )
}

Placeholder.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>
}

ValueContainer.propTypes = {
  children: PropTypes.node,
  selectProps: PropTypes.object.isRequired
}

function MultiValue(props) {
  const ref = useRef(null)
  const {
    data: { value }
  } = props
  const values = props.selectProps.value
  const index = values.findIndex(item => item.value === value)
  const [, drop] = useDrop(
    {
      accept: 'tagChip',
      hover(item, monitor) {
        if (!ref.current) {
          return
        }
        const dragIndex = item.index
        const hoverIndex = index
        if (dragIndex === hoverIndex) {
          return
        }
        const valueToMove = values[dragIndex]
        values.splice(dragIndex, 1)
        values.splice(hoverIndex, 0, valueToMove)
        props.setValue(values)
        item.values = values
        item.index = hoverIndex
      }
    },
    [values]
  )
  const [{ isDragging }, drag] = useDrag({
    item: { type: 'tagChip', index, values },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })
  drag(drop(ref))
  return (
    <Chip
      ref={ref}
      tabIndex={-1}
      label={props.children}
      className={cn('tagChip', props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
        [props.selectProps.classes.chipDragging]: isDragging
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  )
}

MultiValue.propTypes = {
  children: PropTypes.node,
  isFocused: PropTypes.bool,
  removeProps: PropTypes.object.isRequired,
  selectProps: PropTypes.object.isRequired
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  )
}

Menu.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  ValueContainer,
  DropdownIndicator: null
}

const getNoOptionsMessage = () => 'Start typing to add tags'

const getOptionValueFromValue = values =>
  (values || []).map(item => ({
    label: item,
    value: item
  }))

export const FormTagsInput = ({ label, className, field, form, lockerName, lockerValue, placeholder }) => {
  const classes = useStyles()
  const theme = useTheme()
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = inputValue => {
    const tags = inputValue.split(',').map(tag => tag.trim())
    const newInputValue = tags[tags.length - 1]
    if (tags.length > 1) {
      const tagsToAdd = tags.slice(0, tags.length - 1)
      form.setFieldValue(field.name, uniq([...(field.value || []), ...tagsToAdd]))
    }
    setInputValue(newInputValue)
  }

  const handleKeyDown = event => {
    if (!inputValue) return
    switch (event.key) {
      case 'Enter':
      case 'Tab':
      case ',':
        setInputValue('')
        form.setFieldValue(field.name, uniq([...(field.value || []), inputValue]))
        event.preventDefault()
        break
      default:
        return
    }
  }

  const handleChange = values => {
    form.setFieldValue(field.name, values ? values.map(item => item.value) : null)
  }

  const handleToggle = () => {
    const lockerValues = get(form.values, lockerName) || []
    form.setFieldValue(lockerName, xor(lockerValues, [lockerValue]))
  }

  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit'
      }
    })
  }

  return (
    <div className={cn(classes.root, className)}>
      {label && <FormHelperText className={classes.label}>{label}</FormHelperText>}
      <div className={classes.inputRow}>
        {lockerName && (
          <>
            <IconButton onClick={handleToggle} className={classes.iconButton}>
              {(get(form.values, lockerName) || []).includes(lockerValue) ? (
                <LockIcon color="primary" />
              ) : (
                <LockOpenIcon color="inherit" />
              )}
            </IconButton>
            <Divider className={classes.divider} />
          </>
        )}
        <CreatableSelect
          className={classes.select}
          classes={classes}
          styles={selectStyles}
          inputId="react-select-multiple"
          TextFieldProps={{
            InputLabelProps: {
              htmlFor: 'react-select-multiple',
              shrink: true
            },
            placeholder
          }}
          placeholder={placeholder}
          menuIsOpen={false}
          options={suggestions}
          components={components}
          noOptionsMessage={getNoOptionsMessage}
          isMulti
          inputValue={inputValue}
          value={getOptionValueFromValue(field.value)}
          onChange={handleChange}
          onInputChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  )
}

export default FormTagsInput
