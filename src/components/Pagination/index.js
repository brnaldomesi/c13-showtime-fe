import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import get from 'lodash/get'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import PropTypes from 'prop-types'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography'

import { APIListType } from 'utils/propTypes'
import { DEFAULT_PAGE_SIZE } from 'config/constants'
import styles from './styles'
import withRouterAndQueryParams from 'hocs/withRouterAndQueryParams'

const useStyles = makeStyles(styles)
const pageSizeItems = [10, 25, 50, 100, 500]

export const Pagination = props => {
  const classes = useStyles()
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

  const handlePageSizeChange = event => {
    pushWithQuery({
      location,
      queryParams: {
        ...queryParams,
        limit: event.target.value
      }
    })
  }

  return (
    <Grid container alignItems="center">
      <Grid item xs />
      <Grid item>
        <Typography variant="caption" className={classes.caption}>
          Items per page:
        </Typography>
        <Select value={limit} onChange={handlePageSizeChange}>
          {pageSizeItems.map(pageSize => (
            <MenuItem value={pageSize} key={pageSize}>
              {pageSize}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item className={classes.navButtonWrap}>
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
