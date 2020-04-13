import AddCircleIcon from '@material-ui/icons/AddCircle'
import CardMedia from '@material-ui/core/CardMedia'
import PropTypes from 'prop-types'
import React from 'react'
import avatarPlaceholder from './avatar-placeholder.png'
import get from 'lodash/get'
import { makeStyles } from '@material-ui/core/styles'
import podcastPlaceholder from './podcast-placeholder.png'
import styles from './styles'

const useStyles = makeStyles(styles)

const ThumbnailImage = ({ className, imageUrls, title, type, editable }) => {
  const classes = useStyles()

  const url =
    typeof imageUrls === 'string'
      ? imageUrls
      : get(imageUrls, 'original') || (type === 'avatar' ? avatarPlaceholder : podcastPlaceholder)

  return (
    <CardMedia className={className} image={url} title={title}>
      {editable && <AddCircleIcon className={classes.add} />}
    </CardMedia>
  )
}

ThumbnailImage.propTypes = {
  className: PropTypes.string,
  imageUrls: PropTypes.oneOfType([
    PropTypes.shape({
      original: PropTypes.string
    }),
    PropTypes.string
  ]),
  title: PropTypes.string,
  type: PropTypes.oneOf(['avatar', 'podcast']),
  editable: PropTypes.bool
}

ThumbnailImage.defaultProps = {
  type: 'avatar'
}

export default ThumbnailImage
