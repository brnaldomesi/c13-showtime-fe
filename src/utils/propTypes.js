import PropTypes from 'prop-types'

export const APIListType = PropTypes.shape({
  results: PropTypes.array.isRequired,
  links: PropTypes.object
})
