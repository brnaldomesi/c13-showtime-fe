import FeaturedPodcastForm, { validationSchema } from '../components/FeaturedPodcastForm'
import React, { useEffect, useState } from 'react'
import { confirmAndDeleteFeaturedPodcast, featuredPodcastDeletingSelector } from 'redux/modules/podcast'

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import Box from '@material-ui/core/Box'
import DeleteIcon from '@material-ui/icons/Delete'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Formik } from 'formik'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import MovePositionPopOver from '../components/MovePositionPopOver'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { formSubmit } from 'utils/form'
import { makeStyles } from '@material-ui/core/styles'
import styles from './styles'
import { updateFeaturedPodcast } from 'redux/modules/podcast'

const useStyles = makeStyles(styles)

const FeaturedPodcast = ({
  featuredPodcast,
  updateFeaturedPodcast,
  openAll,
  confirmAndDeleteFeaturedPodcast,
  draggableProvided
}) => {
  const featuredPodcastId = featuredPodcast.id
  const classes = useStyles()
  const [open, setOpen] = useState(openAll)

  useEffect(() => {
    setOpen(openAll)
  }, [openAll])

  const handleCancel = (value, setValues) => {
    setOpen(value)
    setValues(featuredPodcast, true)
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

  const handleDelete = id => () => {
    confirmAndDeleteFeaturedPodcast({
      id,
      success: () => {}
    })
  }

  return (
    <div className={classes.root} ref={draggableProvided.innerRef} {...draggableProvided.draggableProps}>
      <Paper className={classes.paper}>
        <Box display="flex" justifyContent="space-between">
          <Box display="flex">
            <Box ml={-2}>
              <IconButton {...draggableProvided.dragHandleProps}>
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
          <Box display="flex">
            <MovePositionPopOver />
            <IconButton>
              <Tooltip title="to top">
                <ArrowUpwardIcon />
              </Tooltip>
            </IconButton>
            <IconButton onClick={handleDelete(featuredPodcastId)}>
              <Tooltip title="delete">
                <DeleteIcon />
              </Tooltip>
            </IconButton>
          </Box>
        </Box>
        <Formik
          initialValues={featuredPodcast}
          validateOnChange
          validateOnBlur
          onSubmit={handleSubmit}
          validationSchema={validationSchema}>
          {formikProps => <FeaturedPodcastForm {...formikProps} open={open} edit={false} onCancel={handleCancel} />}
        </Formik>
      </Paper>
    </div>
  )
}

FeaturedPodcast.propTypes = {
  updateFeaturedPodcast: PropTypes.func.isRequired,
  featuredPodcast: PropTypes.object.isRequired,
  openAll: PropTypes.bool.isRequired,
  confirmAndDeleteFeaturedPodcast: PropTypes.func.isRequired,
  featuredPodcastDeleting: PropTypes.bool,
  draggableProvided: PropTypes.object
}

const selector = createStructuredSelector({
  featuredPodcastDeleting: featuredPodcastDeletingSelector
})

const actions = {
  updateFeaturedPodcast,
  confirmAndDeleteFeaturedPodcast
}

export default connect(selector, actions)(FeaturedPodcast)
