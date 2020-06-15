import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import React, { useEffect, useState } from 'react'
import {
  featuredPodcastsListLoadingSelector,
  featuredPodcastsListSelector,
  getFeaturedPodcastsList
} from 'redux/modules/podcast'

import Box from '@material-ui/core/Box'
import Breadcrumbs from 'components/Breadcrumbs'
import Button from '@material-ui/core/Button'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import FeaturedPodcast from './FeaturedPodcast'
import IconButton from '@material-ui/core/IconButton'
import { Link } from 'react-router-dom'
import LoadingIndicator from 'components/LoadingIndicator'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import styles from './styles'
import { useSnackbar } from 'notistack'
import { userIsAuthenticatedRedir } from 'hocs/withAuth'
import { withStyles } from '@material-ui/core/styles'

const fpods = [
  {
    id: '1a',
    title: '2020 Webby Awards Nominees',
    featuredPodcasts: [
      {
        id: 1,
        imageUrls: {
          original:
            'https://megaphone.imgix.net/podcasts/0999f4c0-4334-11e8-954f-e7892b5b3609/image/uploads_2F1568815781454-qok6p4fxqo-ab964001f7207e83966bc54d11cc5d4b_2F48_promo_apple_3000x3000.jpg?ixlib=rails-2.1.2'
        },
        title: '48-Hours'
      },
      {
        id: 2,
        imageUrls: {
          original:
            'https://megaphone.imgix.net/podcasts/42befcfc-5d6b-11ea-8c0e-ef801c4fa7fc/image/image.jpg?ixlib=rails-2.1.2'
        },
        title: '4th and Forever'
      }
    ]
  },
  {
    id: '2a',
    title: 'Stay Home, Stay Healthy',
    featuredPodcasts: [
      {
        id: 1,
        imageUrls: {
          original:
            'https://megaphone.imgix.net/podcasts/0999f4c0-4334-11e8-954f-e7892b5b3609/image/uploads_2F1568815781454-qok6p4fxqo-ab964001f7207e83966bc54d11cc5d4b_2F48_promo_apple_3000x3000.jpg?ixlib=rails-2.1.2'
        },
        title: '48-Hours'
      },
      {
        id: 2,
        imageUrls: {
          original:
            'https://megaphone.imgix.net/podcasts/42befcfc-5d6b-11ea-8c0e-ef801c4fa7fc/image/image.jpg?ixlib=rails-2.1.2'
        },
        title: '4th and Forever'
      }
    ]
  },
  {
    id: '3a',
    title: 'New & Notable',
    featuredPodcasts: [
      {
        id: 1,
        imageUrls: {
          original:
            'https://megaphone.imgix.net/podcasts/0999f4c0-4334-11e8-954f-e7892b5b3609/image/uploads_2F1568815781454-qok6p4fxqo-ab964001f7207e83966bc54d11cc5d4b_2F48_promo_apple_3000x3000.jpg?ixlib=rails-2.1.2'
        },
        title: '48-Hours'
      },
      {
        id: 2,
        imageUrls: {
          original:
            'https://megaphone.imgix.net/podcasts/42befcfc-5d6b-11ea-8c0e-ef801c4fa7fc/image/image.jpg?ixlib=rails-2.1.2'
        },
        title: '4th and Forever'
      }
    ]
  }
]

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

const grid = 8

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle
})

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250
})

export const FeaturedPodcasts = props => {
  const { classes, featuredPodcasts, getFeaturedPodcastsList, history, featuredPodcastsLoading } = props
  const { enqueueSnackbar } = useSnackbar()
  const [items, setItems] = useState(fpods)
  const [openAll, setOpenAll] = useState(false)
  // useEffect(() => {
  //   getFeaturedPodcastsList({
  //     fail: () => enqueueSnackbar('Failed to load featured podcasts!', { variant: SNACKBAR_TYPE.ERROR })
  //   })
  // }, [getFeaturedPodcastsList, enqueueSnackbar])

  const handleToggleOpenAll = () => setOpenAll(!openAll)

  const handleOnDragEnd = result => {
    if (!result.destination) {
      return
    }

    const orderedItems = reorder(items, result.source.index, result.destination.index)

    setItems(orderedItems)
  }

  return (
    <div className={classes.root}>
      <Breadcrumbs />
      <Box display="flex">
        <Box flexGrow={1} display="flex" mb={1} alignItems="flex-end">
          <Typography variant="h6">Show Hub Featured Podcasts</Typography>
        </Box>
        <Box mb={2}>
          <Button color="primary" variant="contained" component={Link} to="/featuredPodcasts/new">
            ADD NEW FEATURED SECTION
          </Button>
        </Box>
      </Box>
      <Box display="flex">
        <IconButton onClick={handleToggleOpenAll}>
          {openAll ? <ExpandLessIcon color="action" /> : <ExpandMoreIcon color="action" />}
        </IconButton>
        <Box my="auto">
          <Typography>{openAll ? 'Collapse All' : 'Expand All'}</Typography>
        </Box>
      </Box>
      {featuredPodcastsLoading ? (
        <LoadingIndicator />
      ) : (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {items &&
                  items.map((featuredPodcast, index) => (
                    <Draggable key={featuredPodcast.id} draggableId={featuredPodcast.id} index={index}>
                      {(provided, snapshot) => (
                        <FeaturedPodcast
                          featuredPodcast={featuredPodcast}
                          openAll={openAll}
                          draggableProvided={provided}
                        />
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  )
}

FeaturedPodcasts.propTypes = {
  classes: PropTypes.object.isRequired,
  getFeaturedPodcastsList: PropTypes.func.isRequired,
  featuredPodcasts: PropTypes.array.isRequired,
  featuredPodcastsLoading: PropTypes.bool
}

const selector = createStructuredSelector({
  featuredPodcasts: featuredPodcastsListSelector,
  featuredPodcastsLoading: featuredPodcastsListLoadingSelector
})

const actions = {
  getFeaturedPodcastsList
}

export default compose(userIsAuthenticatedRedir, connect(selector, actions), withStyles(styles))(FeaturedPodcasts)
