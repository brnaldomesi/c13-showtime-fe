import PropTypes from 'prop-types'

export const APIListType = PropTypes.shape({
  data: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired,
  prevCursor: PropTypes.string,
  nextCursor: PropTypes.string
})
