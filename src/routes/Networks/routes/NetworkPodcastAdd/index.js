import React, { useEffect, useMemo, useState } from 'react'
import { allPodcastsLoadingSelector, allPodcastsSelector, getAllPodcasts } from 'redux/modules/podcast'
import {
  getNetworkDetails,
  getNetworkPodcastsList,
  networkDetailsLoadingSelector,
  networkDetailsSelector,
  networkPodcastsListLoadingSelector,
  networkPodcastsListSelector
} from 'redux/modules/network'

import Autocomplete from '@material-ui/lab/Autocomplete'
import Box from '@material-ui/core/Box'
import Breadcrumbs from 'components/Breadcrumbs'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import LeftPane from '../../components/LeftPane'
import { Link } from 'react-router-dom'
import LoadingIndicator from 'components/LoadingIndicator'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import { SNACKBAR_TYPE } from 'config/constants'
import TextField from '@material-ui/core/TextField'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import differenceWith from 'lodash/differenceWith'
import fp from 'lodash/fp'
import styles from './styles'
import { updatePodcastNetwork } from 'redux/modules/podcast'
import { useSnackbar } from 'notistack'
import { userIsAuthenticatedRedir } from 'hocs/withAuth'
import { withStyles } from '@material-ui/core/styles'

export const NetworkPodcastAdd = props => {
  const {
    classes,
    getNetworkDetails,
    getAllPodcasts,
    allPodcasts,
    getNetworkPodcastsList,
    match,
    networkDetails,
    networkPodcasts,
    allPodcastsLoading,
    networkPodcastsLoading,
    networkDetailsLoading,
    updatePodcastNetwork,
    history
  } = props
  const { enqueueSnackbar } = useSnackbar()
  const podcastsOption = useMemo(() => {
    if (networkPodcasts && allPodcasts) {
      const simplifiedNetworkPodcasts = networkPodcasts.map(item => ({
        id: item.id,
        imageUrl: item.imageUrls.original,
        title: item.title
      }))

      return differenceWith(allPodcasts, simplifiedNetworkPodcasts, fp.isEqual)
    } else {
      return null
    }
  }, [networkPodcasts, allPodcasts])
  const [podcast, setPodcast] = useState(null)
  const [podcastAdding, setPodcastAdding] = useState(false)

  useEffect(() => {
    if (!networkDetails) {
      getNetworkDetails({
        id: match.params.networkId,
        fail: () => enqueueSnackbar('Failed to load network details!', { variant: SNACKBAR_TYPE.ERROR })
      })
    }
  }, [match, networkDetails, getNetworkDetails, enqueueSnackbar])

  useEffect(() => {
    if (!networkPodcasts) {
      getNetworkPodcastsList({
        networkId: match.params.networkId,
        fail: () => enqueueSnackbar('Failed to load podcasts of the network!', { variant: SNACKBAR_TYPE.ERROR })
      })
    }
  }, [match, getNetworkPodcastsList, networkPodcasts, enqueueSnackbar])

  useEffect(() => {
    if (allPodcasts.length === 0) {
      getAllPodcasts({
        fail: () => enqueueSnackbar('Failed to load all podcasts!', { variant: SNACKBAR_TYPE.ERROR })
      })
    }
  }, [getAllPodcasts, allPodcasts, enqueueSnackbar])

  const handleSave = () => {
    setPodcastAdding(true)
    updatePodcastNetwork({
      id: podcast.id,
      data: {
        networkId: match.params.networkId
      },
      success: () => {
        setPodcastAdding(false)
        enqueueSnackbar('Saved successfully!', { variant: SNACKBAR_TYPE.SUCCESS })
        history.push(`/networks/${match.params.networkId}/podcasts`)
      },
      fail: err => {
        setPodcastAdding(false)
        if (err) {
          enqueueSnackbar(err, { variant: SNACKBAR_TYPE.ERROR })
        } else {
          enqueueSnackbar('Failed to add podcast to network', { variant: SNACKBAR_TYPE.ERROR })
        }
      }
    })
  }

  const handleChange = (e, p) => {
    setPodcast(p)
  }

  return (
    <>
      {!networkPodcastsLoading && !networkDetailsLoading && (
        <LeftPane networkDetails={networkDetails} state="NETWORK_PODCASTS_EDIT" />
      )}
      <div className={classes.content}>
        <Breadcrumbs />
        <Paper className={classes.paper}>
          {networkPodcastsLoading || networkDetailsLoading || allPodcastsLoading || podcastAdding ? (
            <LoadingIndicator />
          ) : (
            <>
              {podcastsOption && (
                <Box mb={2}>
                  <Autocomplete
                    id="networkPodcasts"
                    options={podcastsOption}
                    getOptionLabel={option => option.title}
                    onChange={handleChange}
                    renderInput={params => <TextField {...params} variant="outlined" label="Podcasts" />}
                  />
                </Box>
              )}
              <Grid container justify="flex-end" spacing={2}>
                <Grid item>
                  <Button color="primary" component={Link} to={`/networks/${match.params.networkId}/podcasts`}>
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" onClick={handleSave}>
                    SAVE CHANGES
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
        </Paper>
      </div>
    </>
  )
}

NetworkPodcastAdd.propTypes = {
  classes: PropTypes.object.isRequired,
  updatePodcastNetwork: PropTypes.func.isRequired,
  getNetworkDetails: PropTypes.func.isRequired,
  getNetworkPodcastsList: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  networkDetails: PropTypes.object,
  networkDetailsLoading: PropTypes.bool,
  networkPodcasts: PropTypes.array,
  networkPodcastsLoading: PropTypes.bool
}

const selector = createStructuredSelector({
  networkDetails: networkDetailsSelector,
  networkDetailsLoading: networkDetailsLoadingSelector,
  networkPodcasts: networkPodcastsListSelector,
  networkPodcastsLoading: networkPodcastsListLoadingSelector,
  allPodcasts: allPodcastsSelector,
  allPodcastsLoading: allPodcastsLoadingSelector
})

const actions = {
  getAllPodcasts,
  getNetworkDetails,
  getNetworkPodcastsList,
  updatePodcastNetwork
}

export default compose(userIsAuthenticatedRedir, connect(selector, actions), withStyles(styles))(NetworkPodcastAdd)
