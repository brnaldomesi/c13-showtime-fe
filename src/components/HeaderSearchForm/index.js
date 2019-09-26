import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import { withStyles } from '@material-ui/core'
import InputBase from '@material-ui/core/InputBase'
import match from 'autosuggest-highlight/match'
import MenuItem from '@material-ui/core/MenuItem'
import parse from 'autosuggest-highlight/parse'
import PropTypes from 'prop-types'
import SearchIcon from '@material-ui/icons/Search'

import { podcastsSearchResultsSelector, searchPodcasts } from 'redux/modules/podcast'
import AutoSuggest from 'components/AutoSuggest'
import ThumbnailImage from 'components/ThumbnailImage'
import withRouterAndQueryParams from 'hocs/withRouterAndQueryParams'
import styles from './styles'

const renderInputComponent = classes => inputProps => {
  const { inputRef = () => {}, ref, InputLabelProps, ...other } = inputProps

  return (
    <div className={classes.inputWrapper}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        {...other}
        name="search"
        placeholder="Find a podcast..."
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }}
        inputProps={{ 'aria-label': 'search' }}
        inputRef={node => {
          ref(node)
          inputRef(node)
        }}
      />
    </div>
  )
}

const renderSuggestion = classes => (suggestion, { query, isHighlighted }) => {
  const value = getSuggestionValue(suggestion)
  const matches = match(value, `${query}`)
  const parts = parse(value, matches)

  return (
    <MenuItem selected={isHighlighted} component="div">
      <ThumbnailImage imageUrls={suggestion.imageUrl} className={classes.suggestionImage} />
      <div className={classes.suggestionText}>
        {parts.map(part => (
          <span key={part.text} style={{ fontWeight: part.highlight ? 700 : 400 }}>
            {part.text}
          </span>
        ))}
      </div>
    </MenuItem>
  )
}

const getSuggestionValue = suggestion => suggestion.title

export const HeaderSearchForm = ({ classes, pushWithQuery, searchPodcasts }) => {
  const handleSubmit = values => {
    pushWithQuery({
      location: { pathname: '/podcasts' },
      queryParams: { search: values.search }
    })
  }

  const handleSelectSuggestion = suggestion => {
    pushWithQuery({
      location: { pathname: `/podcasts/${suggestion.id}` }
    })
  }

  return (
    <Formik onSubmit={handleSubmit}>
      {({ setFieldValue, values, handleSubmit }) => (
        <form className={classes.root} onSubmit={handleSubmit}>
          <AutoSuggest
            name="search"
            getSuggestions={searchPodcasts}
            getSuggestionValue={getSuggestionValue}
            suggestionsSelector={podcastsSearchResultsSelector}
            inputComponent={renderInputComponent(classes)}
            suggestionComponent={renderSuggestion(classes)}
            onChange={value => setFieldValue('search', value)}
            onSuggestionSelected={handleSelectSuggestion}
            value={values.search || ''}
          />
        </form>
      )}
    </Formik>
  )
}

HeaderSearchForm.propTypes = {
  classes: PropTypes.object.isRequired
}

const actions = {
  searchPodcasts
}

export default compose(
  withRouterAndQueryParams,
  connect(
    null,
    actions
  ),
  withStyles(styles)
)(HeaderSearchForm)
