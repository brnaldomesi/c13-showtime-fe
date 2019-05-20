import PropTypes from 'prop-types'

export const APIListType = PropTypes.shape({
  rows: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired
})
