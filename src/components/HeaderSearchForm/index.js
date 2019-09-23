import React from 'react'
import { compose } from 'redux'
import { Formik } from 'formik'
import { withStyles } from '@material-ui/core'
import InputBase from '@material-ui/core/InputBase'
import PropTypes from 'prop-types'
import SearchIcon from '@material-ui/icons/Search'

import withRouterAndQueryParams from 'hocs/withRouterAndQueryParams'
import styles from './styles'

export const HeaderSearchForm = ({ classes, pushWithQuery }) => {
  const handleSubmit = values => {
    pushWithQuery({
      location: { pathname: '/podcasts' },
      queryParams: { search: values.search }
    })
  }

  return (
    <Formik onSubmit={handleSubmit}>
      {({ handleChange, handleBlur, values, handleSubmit }) => (
        <form className={classes.root} onSubmit={handleSubmit}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            name="search"
            placeholder="Find a podcast..."
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.search || ''}
            inputProps={{ 'aria-label': 'search' }}
          />
        </form>
      )}
    </Formik>
  )
}

HeaderSearchForm.propTypes = {
  classes: PropTypes.object.isRequired
}

export default compose(
  withRouterAndQueryParams,
  withStyles(styles)
)(HeaderSearchForm)
