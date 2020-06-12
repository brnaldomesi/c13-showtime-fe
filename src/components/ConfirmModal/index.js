import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import PropTypes from 'prop-types'
import React from 'react'
import { connectModal } from 'redux-modal'

const ConfirmModal = ({ handleHide, show, title, text, onConfirm, onCancel }) => {
  const handleConfirm = () => {
    handleHide()
    onConfirm && onConfirm()
  }

  const handleClose = () => {
    handleHide()
    onCancel && onCancel()
  }

  return (
    <Dialog
      open={show}
      onClose={handleClose}
      aria-labelledby="confirm-modal-title"
      aria-describedby="confirm-modal-description">
      <DialogTitle id="confirm-modal-title">
        <Box pt={4} px={2}>
          {title}
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="confirm-modal-description">{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Box display="flex" justifyContent="center" pb={4} width={1}>
          <Box px={1}>
            <Button onClick={handleClose} color="primary" autoFocus>
              CANCEL
            </Button>
          </Box>
          <Box px={1}>
            <Button variant="contained" onClick={handleConfirm} color="secondary">
              DELETE
            </Button>
          </Box>
        </Box>
      </DialogActions>
    </Dialog>
  )
}

ConfirmModal.propTypes = {
  handleHide: PropTypes.func.isRequired,
  show: PropTypes.bool,
  title: PropTypes.node,
  text: PropTypes.node,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func
}

export default connectModal({ name: 'confirmModal' })(ConfirmModal)
