import React, { useEffect } from 'react'
import { getNetworkDetails, networkDetailsLoadingSelector, networkDetailsSelector } from 'redux/modules/network'

import Breadcrumbs from 'components/Breadcrumbs'
import LeftPane from '../../components/LeftPane'
import LoadingIndicator from 'components/LoadingIndicator'
import NetworkForm from '../../components/NetworkForm'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import { SNACKBAR_TYPE } from 'config/constants'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { formSubmit } from 'utils/form'
import { makeStyles } from '@material-ui/core/styles'
import styles from './styles'
import { updateNetwork } from 'redux/modules/network'
import { useSnackbar } from 'notistack'

const useStyles = makeStyles(styles)

const NetworkEdit = ({ updateNetwork, match, networkDetails, getNetworkDetails, networkDetailsLoading }) => {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    getNetworkDetails({
      id: match.params.networkId,
      fail: () => enqueueSnackbar('Failed to load network details!', { variant: SNACKBAR_TYPE.ERROR })
    })
  }, [match, getNetworkDetails, enqueueSnackbar])

  const handleSubmit = (values, formActions) => {
    return formSubmit(
      updateNetwork,
      {
        id: match.params.networkId,
        data: values,
        success: () => {
          enqueueSnackbar('Saved successfully!', { variant: SNACKBAR_TYPE.SUCCESS })
        },
        fail: () => enqueueSnackbar('Failed to save the network details.', { variant: SNACKBAR_TYPE.ERROR })
      },
      formActions
    )
  }

  return (
    <>
      {!networkDetailsLoading && <LeftPane networkDetails={networkDetails} state="NETWORK_EDIT" />}
      <div className={classes.content}>
        <Breadcrumbs />
        <Paper className={classes.paper}>
          {networkDetailsLoading ? (
            <LoadingIndicator />
          ) : (
            <NetworkForm networkDetails={networkDetails} onSubmit={handleSubmit} networkId={match.params.networkId} />
          )}
        </Paper>
      </div>
    </>
  )
}

NetworkEdit.propTypes = {
  updateNetwork: PropTypes.func.isRequired,
  getNetworkDetails: PropTypes.func.isRequired,
  networkDetailsLoading: PropTypes.bool,
  networkDetails: PropTypes.object
}

const selector = createStructuredSelector({
  networkDetails: networkDetailsSelector,
  networkDetailsLoading: networkDetailsLoadingSelector
})

const actions = {
  updateNetwork,
  getNetworkDetails
}

export default connect(selector, actions)(NetworkEdit)
