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

export const Pagination = props => {
  const { listData, location, pushWithQuery, queryParams } = props
  const { prevCursor = null, nextCursor = null, limit = DEFAULT_PAGE_SIZE } = queryParams
  const isPrevDisabled = (!prevCursor && !nextCursor) || !get(listData, 'prevCursor')
  const isNextDisabled = !get(listData, 'nextCursor')

  const handlePrevPage = () => {
    if (!listData.prevCursor) return
    pushWithQuery({
      location,
      queryParams: {
        limit,
        prevCursor: listData.prevCursor
      }
    })
  }

  const handleNextPage = () => {
    if (!listData.nextCursor) return
    pushWithQuery({
      location,
      queryParams: {
        limit,
        nextCursor: listData.nextCursor
      }
    })
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
  queryParams: PropTypes.object
}

export default withRouterAndQueryParams(Pagination)
