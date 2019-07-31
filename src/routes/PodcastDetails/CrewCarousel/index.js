import React, { useEffect, useRef } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ArrowLeft'
import ChevronRightIcon from '@material-ui/icons/ArrowRight'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Slider from 'react-slick'

import { getCrewMembersList, crewMembersListSelector } from 'redux/modules/crew'
import { getFullName } from 'utils/helpers'
import styles from './styles'
import ThumbnailImage from 'components/ThumbnailImage'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const sliderSettings = {
  dots: false,
  arrows: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1
}

const CrewCarouselItem = ({ crewMember, classes }) => (
  <div>
    <ThumbnailImage className={classes.avatar} imageUrls={crewMember.imageUrls} title={getFullName(crewMember)} />
    <Typography variant="body2" align="center">
      {getFullName(crewMember)}
    </Typography>
  </div>
)

const CrewCarousel = ({ classes, podcastId, crewMembers, getCrewMembersList }) => {
  const sliderRef = useRef(null)
  useEffect(() => {
    getCrewMembersList({ podcastId })
  }, [podcastId, getCrewMembersList])

  const handleSlideLeft = () => {
    sliderRef.current.slickPrev()
  }

  const handleSlideRight = () => {
    sliderRef.current.slickNext()
  }

  return (
    <div className={classes.root}>
      <IconButton className={classes.arrowLeft} onClick={handleSlideLeft}>
        <ChevronLeftIcon fontSize="inherit" />
      </IconButton>
      <IconButton className={classes.arrowRight} onClick={handleSlideRight}>
        <ChevronRightIcon fontSize="inherit" />
      </IconButton>
      <Grid item xs>
        <Slider {...sliderSettings} ref={sliderRef}>
          {crewMembers.map(item => (
            <CrewCarouselItem key={item.guid} crewMember={item} classes={classes} />
          ))}
        </Slider>
      </Grid>
    </div>
  )
}

CrewCarousel.propTypes = {
  classes: PropTypes.object.isRequired,
  crewMembers: PropTypes.array.isRequired,
  getCrewMembersList: PropTypes.func.isRequired,
  podcastId: PropTypes.string.isRequired
}

const selector = createStructuredSelector({
  crewMembers: crewMembersListSelector
})

const actions = {
  getCrewMembersList
}

export default compose(
  connect(
    selector,
    actions
  ),
  withStyles(styles)
)(CrewCarousel)
