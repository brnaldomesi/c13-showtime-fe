import PropTypes from 'prop-types'

export const APIListType = PropTypes.shape({
  data: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  prevCursor: PropTypes.string,
  nextCursor: PropTypes.string
})
