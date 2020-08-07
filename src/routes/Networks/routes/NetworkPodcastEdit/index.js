import React, { useEffect, useMemo, useState } from 'react'
import { allPodcastsLoadingSelector, allPodcastsSelector, getAllPodcasts } from 'redux/modules/podcast'
import {
  getNetworkDetails,
  getNetworkPodcastsList,
  networkDetailsLoadingSelector,
  networkDetailsSelector,
  networkPodcastsListLoadingSelector,
  networkPodcastsListSelector,
  updateNetworkPodcasts
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
import styles from './styles'
import { useSnackbar } from 'notistack'
import { userIsAuthenticatedRedir } from 'hocs/withAuth'
import { withStyles } from '@material-ui/core/styles'

export const NetworkPodcastEdit = props => {
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
    updateNetworkPodcasts
  } = props
  const { enqueueSnackbar } = useSnackbar()
  const memoPodcasts = useMemo(
    () =>
      networkPodcasts &&
      networkPodcasts.map(item => ({
        id: item.id,
        imageUrl: item.imageUrls.original,
        title: item.title
      })),
    [networkPodcasts]
  )
  const [podcasts, setPodcasts] = useState(memoPodcasts)
  useEffect(() => {
    setPodcasts(memoPodcasts)
  }, [memoPodcasts])

  useEffect(() => {
    if (!networkDetails) {
      getNetworkDetails({
        id: match.params.networkId,
        fail: () => enqueueSnackbar('Failed to load network details!', { variant: SNACKBAR_TYPE.ERROR })
      })
    }
    if (networkPodcasts.length === 0) {
      getNetworkPodcastsList({
        networkId: match.params.networkId,
        fail: () => enqueueSnackbar('Failed to load podcasts of the network!', { variant: SNACKBAR_TYPE.ERROR })
      })
    }
    if (allPodcasts.length === 0) {
      getAllPodcasts({
        fail: () => enqueueSnackbar('Failed to load all podcasts!', { variant: SNACKBAR_TYPE.ERROR })
      })
    }
  }, [
    match,
    networkDetails,
    networkPodcasts,
    allPodcasts,
    getAllPodcasts,
    getNetworkDetails,
    getNetworkPodcastsList,
    enqueueSnackbar
  ])

  const handleSave = () => {
    updateNetworkPodcasts({
      data: {
        networkId: match.params.networkId,
        podcasts
      },
      success: () => enqueueSnackbar('Saved successfully!', { variant: SNACKBAR_TYPE.SUCCESS })
    })
  }

  const handleChange = (e, p) => {
    setPodcasts(p)
  }

  return (
    <>
      {!networkPodcastsLoading && !networkDetailsLoading && (
        <LeftPane networkDetails={networkDetails} state="NETWORK_PODCASTS_EDIT" />
      )}
      <div className={classes.content}>
        <Breadcrumbs />
        <Paper className={classes.paper}>
          {networkPodcastsLoading || networkDetailsLoading || allPodcastsLoading ? (
            <LoadingIndicator />
          ) : (
            <>
              <Box mb={2}>
                <Autocomplete
                  multiple
                  id="networkPodcasts"
                  options={allPodcasts}
                  value={podcasts}
                  getOptionLabel={option => option.title}
                  filterSelectedOptions
                  getOptionSelected={(option, value) => value.id === option.id}
                  onChange={handleChange}
                  renderInput={params => <TextField {...params} variant="outlined" label="Podcasts" />}
                />
              </Box>
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

NetworkPodcastEdit.propTypes = {
  classes: PropTypes.object.isRequired,
  updateNetworkPodcasts: PropTypes.func.isRequired,
  getNetworkDetails: PropTypes.func.isRequired,
  getNetworkPodcastsList: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  networkDetails: PropTypes.object,
  networkDetailsLoading: PropTypes.bool,
  networkPodcasts: PropTypes.array.isRequired,
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
  updateNetworkPodcasts
}

export default compose(userIsAuthenticatedRedir, connect(selector, actions), withStyles(styles))(NetworkPodcastEdit)
