import React from 'react'
import CardMedia from '@material-ui/core/CardMedia'
import get from 'lodash/get'
import PropTypes from 'prop-types'

import podcastPlaceholder from './podcast-placeholder.png'
import avatarPlaceholder from './avatar-placeholder.png'

const ThumbnailImage = ({ className, imageUrls, title, type }) => {
  const url =
    typeof imageUrls === 'string'
      ? imageUrls
      : get(imageUrls, 'original') || (type === 'avatar' ? avatarPlaceholder : podcastPlaceholder)

  return <CardMedia className={className} image={url} title={title} />
}

ThumbnailImage.propTypes = {
  className: PropTypes.string,
  imageUrls: PropTypes.shape({
    original: PropTypes.string
  }),
  title: PropTypes.string,
  type: PropTypes.oneOf(['avatar', 'podcast'])
}

ThumbnailImage.defaultProps = {
  type: 'avatar'
}

export default ThumbnailImage
