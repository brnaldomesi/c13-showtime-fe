import PropTypes from 'prop-types'
import React from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import styles from './styles'
import { withStyles } from '@material-ui/core/styles'

export const SortableTableHead = ({ onRequestSort, order, orderBy, columns, classes }) => {
  const createSortHandler = property => () => {
    onRequestSort(property)
  }

  return (
    <TableHead>
      <TableRow>
        {columns.map(column => (
          <TableCell key={column.id} {...column.props}>
            {column.sortable !== false ? (
              <TableSortLabel active={orderBy === column.id} direction={order} onClick={createSortHandler(column.id)}>
                {column.label}
                {orderBy === column.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            ) : (
              column.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

SortableTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired
}

export default withStyles(styles)(SortableTableHead)
