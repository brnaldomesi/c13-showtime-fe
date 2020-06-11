import FeaturedPodcastForm, { validationSchema } from '../components/FeaturedPodcastForm'
import React, { useEffect, useState } from 'react'

import Box from '@material-ui/core/Box'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Formik } from 'formik'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { formSubmit } from 'utils/form'
import { makeStyles } from '@material-ui/core/styles'
import styles from './styles'
import { updateFeaturedPodcast } from 'redux/modules/podcast'

const useStyles = makeStyles(styles)

const FeaturedPodcast = ({ featuredPodcast, updateFeaturedPodcast, match, openAll }) => {
  const featuredPodcastId = featuredPodcast.id
  const classes = useStyles()
  const [open, setOpen] = useState(openAll)

  useEffect(() => {
    setOpen(openAll)
  }, [openAll])

  const handleExpand = value => {
    setOpen(value)
  }

  const handleSubmit = (values, actions) => {
    return formSubmit(
      updateFeaturedPodcast,
      {
        id: featuredPodcastId,
        data: values
      },
      actions
    )
  }

  const handleToggleOpen = () => setOpen(!open)

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Box display="flex">
          <Box ml={-2}>
            <IconButton className={classes.dragDropIcon}>
              <MoreVertIcon color="action" />
            </IconButton>
          </Box>
          <IconButton onClick={handleToggleOpen}>
            {open ? <ExpandLessIcon color="action" /> : <ExpandMoreIcon color="action" />}
          </IconButton>
          <Box my="auto">
            <Typography>{open ? 'Collapse' : 'Expand'}</Typography>
          </Box>
        </Box>
        <Formik
          initialValues={featuredPodcast}
          validateOnChange
          validateOnBlur
          onSubmit={handleSubmit}
          validationSchema={validationSchema}>
          {formikProps => <FeaturedPodcastForm {...formikProps} open={open} edit={false} onExpand={handleExpand} />}
        </Formik>
      </Paper>
    </div>
  )
}

FeaturedPodcast.propTypes = {
  updateFeaturedPodcast: PropTypes.func.isRequired,
  featuredPodcast: PropTypes.object.isRequired,
  openAll: PropTypes.bool.isRequired
}

const selector = createStructuredSelector({})

const actions = {
  updateFeaturedPodcast
}

export default connect(selector, actions)(FeaturedPodcast)
