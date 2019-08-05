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
import { getFullName } from 'utils/helpers'
import { networkDetailsSelector } from 'redux/modules/network'
import { podcastDetailsSelector } from 'redux/modules/podcast'
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

const buildBredcrumbItems = ({ match, location, networkDetails, podcastDetails, crewMemberDetails }) => {
  const { podcastId, networkId, tabId, crewId } = match.params
  console.log(match.params)
  const results = [
    {
      name: 'Home',
      path: '/'
    }
  ]
  const isNetworkRoute = location.pathname.startsWith('/networks')
  const isPodcastRoute = location.pathname.startsWith('/podcasts')

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
        path: `/podcasts/${podcastId}/edit`
      })
      if (tabId) {
        results.push({
          name: tabNames[tabId],
          path: `/podcasts/${podcastId}/edit/${tabId}`
        })
      }
      if (crewId && crewMemberDetails) {
        results.push({
          name: getFullName(crewMemberDetails),
          path: `/podcasts/${podcastId}/edit/crew/${crewId}/edit`
        })
      }
    } else {
      results.push({
        name: 'Podcasts',
        path: '/podcasts'
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
  podcastDetails: podcastDetailsSelector
})

export default compose(
  withRouterAndQueryParams,
  connect(selector)
)(Breadcrumbs)
