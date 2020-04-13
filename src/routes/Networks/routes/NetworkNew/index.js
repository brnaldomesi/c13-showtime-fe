import Breadcrumbs from 'components/Breadcrumbs'
import LeftPane from '../../components/LeftPane'
import NetworkForm from '../../components/NetworkForm'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import React from 'react'
import { SNACKBAR_TYPE } from 'config/constants'
import { connect } from 'react-redux'
import { createNetwork } from 'redux/modules/network'
import { formSubmit } from 'utils/form'
import { makeStyles } from '@material-ui/core/styles'
import styles from './styles'
import { useSnackbar } from 'notistack'

const useStyles = makeStyles(styles)

const initialValues = {
  name: '',
  status: 'ACTIVE'
}

const NetworkNew = ({ createNetwork, match, history }) => {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()

  const handleSubmit = (values, formActions) => {
    return formSubmit(
      createNetwork,
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
      <LeftPane networkDetails={initialValues} state="NETWORK_NEW" />
      <div className={classes.content}>
        <Breadcrumbs />
        <Paper className={classes.paper}>
          <NetworkForm networkDetails={initialValues} onSubmit={handleSubmit} />
        </Paper>
      </div>
    </>
  )
}

NetworkNew.propTypes = {
  createNetwork: PropTypes.func.isRequired
}

const actions = {
  createNetwork
}

export default connect(null, actions)(NetworkNew)
