import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import Link from '@material-ui/core/Link'
import MuiBreadcrumbs from '@material-ui/core/Breadcrumbs'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import Typography from '@material-ui/core/Typography'

import { crewMemberDetailsSelector } from 'redux/modules/crew'
import { episodeDetailsSelector } from 'redux/modules/episode'
import { getFullName, truncate } from 'utils/helpers'
import { networkDetailsSelector } from 'redux/modules/network'
import { podcastDetailsSelector } from 'redux/modules/podcast'
import { userSelector } from 'redux/modules/user'
import styles from './styles'
import withRouterAndQueryParams from 'hocs/withRouterAndQueryParams'

const LinkRouter = props => <Link {...props} component={RouterLink} />

const useStyles = makeStyles(styles)

const tabNames = {
  general: 'Edit General Fields',
  episodes: 'Episodes',
  'subscribe-links': 'Edit Subscribe Links',
  crew: 'Crew Members'
}

const buildBredcrumbItems = ({ episode, match, location, networkDetails, podcastDetails, crewMemberDetails, user }) => {
  const { userId, podcastId, networkId, tabId, instanceId } = match.params
  const results = [
    {
      name: 'Home',
      path: '/'
    }
  ]
  const isNetworkRoute = location.pathname.startsWith('/networks')
  const isPodcastRoute = location.pathname.startsWith('/podcasts')
  const isUserRoute = location.pathname.startsWith('/users')
  const crewId = tabId === 'crew' ? instanceId : undefined
  const episodeId = tabId === 'episodes' ? instanceId : undefined
  if (isNetworkRoute) {
    results.push({
      name: 'Networks',
      path: '/networks'
    })
    if (networkDetails && networkDetails.id === networkId) {
      results.push({
        name: networkDetails.name,
        path: `/networks/${networkId}`
      })
    }
  } else if (isPodcastRoute) {
    if (podcastDetails && podcastDetails.id === podcastId) {
      results.push({
        name: podcastDetails.network.name,
        path: `/networks/${podcastDetails.network.id}`
      })
      results.push({
        name: podcastDetails.title,
        path: `/podcasts/${podcastId}`
      })
      if (tabId) {
        results.push({
          name: tabNames[tabId],
          path: `/podcasts/${podcastId}/${tabId}`
        })
      }
      if (crewId && crewMemberDetails) {
        results.push({
          name: getFullName(crewMemberDetails),
          path: `/podcasts/${podcastId}/crew/${crewId}`
        })
      }
      if (episodeId && episode) {
        results.push({
          name: truncate(episode.title, 40),
          path: `/podcasts/${podcastId}/episode/${episodeId}`
        })
      }
    } else {
      results.push({
        name: 'Podcasts',
        path: '/podcasts'
      })
    }
  } else if (isUserRoute) {
    results.push({
      name: 'Users',
      path: '/users'
    })
    if (user && user.id === userId) {
      results.push({
        name: getFullName(user),
        path: `/users/${userId}`
      })
    }
    if (location.pathname.startsWith('/users/new')) {
      results.push({
        name: 'New User',
        path: `/users/new`
      })
    }
  }
  return results
}

const Breadcrumbs = props => {
  const classes = useStyles()
  const breadcrumbItems = buildBredcrumbItems(props)

  return (
    <div className={classes.root}>
      <MuiBreadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        {breadcrumbItems.map((item, index) =>
          breadcrumbItems.length === index + 1 ? (
            <Typography key={item.path} color="textPrimary">
              {item.name}
            </Typography>
          ) : (
            <LinkRouter color="inherit" to={item.path} key={item.path}>
              {item.name}
            </LinkRouter>
          )
        )}
      </MuiBreadcrumbs>
    </div>
  )
}

const selector = createStructuredSelector({
  crewMemberDetails: crewMemberDetailsSelector,
  networkDetails: networkDetailsSelector,
  podcastDetails: podcastDetailsSelector,
  episode: episodeDetailsSelector,
  user: userSelector
})

export default compose(
  withRouterAndQueryParams,
  connect(selector)
)(Breadcrumbs)
