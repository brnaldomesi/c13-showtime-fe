import React from 'react'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import get from 'lodash/get'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import PropTypes from 'prop-types'

import { APIListType } from 'utils/propTypes'
import { DEFAULT_PAGE_SIZE } from 'config/constants'
import withRouterAndQueryParams from 'hocs/withRouterAndQueryParams'

export const Pagination = (props) => {
  const { history, listData, location, pushWithQuery, queryParams } = props
  const { startAfter = null, endBefore = null, limit = DEFAULT_PAGE_SIZE } = queryParams
  const results = listData ? listData.results : []
  const isPrevDisabled = (
    (!startAfter && !endBefore) || (Boolean(results.length) && results[0].guid === endBefore)
  ) && !get(listData, 'links.prev')
  const isNextDisabled = !listData.hasMore && !get(listData, 'links.next')

  const handlePrevPage = () => {
    if (listData.links) {
      history.push(listData.links.prev)
    } else {
      if (!results.length) return
      pushWithQuery({
        location,
        queryParams: {
          limit,
          endBefore: results[0].guid,
        }
      })
    }
  }

  const handleNextPage = () => {
    if (listData.links) {
      history.push(listData.links.next)
    } else {
      if (!results.length) return
      pushWithQuery({
        location,
        queryParams: {
          limit,
          startAfter: results[results.length - 1].guid,
        }
      })
    }
  }

  return (
    <Grid container>
      <Grid item xs />
      <Grid item>
        <IconButton onClick={handlePrevPage} disabled={isPrevDisabled}>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton onClick={handleNextPage} disabled={isNextDisabled}>
          <ChevronRightIcon />
        </IconButton>
      </Grid>
    </Grid>
  )
}

Pagination.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  listData: APIListType.isRequired,
  pushWithQuery: PropTypes.func.isRequired,
  queryParams: PropTypes.object,
}

export default withRouterAndQueryParams(Pagination)
