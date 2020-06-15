import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state'
import React, { useRef } from 'react'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'
import IconButton from '@material-ui/core/IconButton'
import Popover from '@material-ui/core/Popover'
import PropTypes from 'prop-types'
import { SNACKBAR_TYPE } from 'config/constants'
import { TextField } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import styles from './styles'
import { useSnackbar } from 'notistack'

const useStyles = makeStyles(styles)

const MovePositionPopOver = ({ onMovePosition, index }) => {
  const classes = useStyles()
  const inputEl = useRef(null)
  const { enqueueSnackbar } = useSnackbar()

  const handleApply = () => {
    const newPosition = inputEl.current.value
    if (newPosition < 1 || newPosition > 3) {
      enqueueSnackbar('Index is out of range', { variant: SNACKBAR_TYPE.WARNING })
      inputEl.current.focus()
      return
    }
    onMovePosition(index, newPosition - 1)
  }

  return (
    <PopupState variant="popover" popupId="position-popup-popover">
      {popupState => (
        <div>
          <IconButton {...bindTrigger(popupState)}>
            <Tooltip title="move to position">
              <FormatListBulletedIcon />
            </Tooltip>
          </IconButton>
          <Popover
            {...bindPopover(popupState)}
            classes={{ paper: classes.popOverContainer }}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}>
            <Box p={2} display="flex" boxShadow={3} className={classes.popOver}>
              <Box my="auto" mx={1}>
                <Typography>Move to position</Typography>
              </Box>
              <Box width={75} mx={1}>
                <TextField
                  id="outlined-number"
                  type="number"
                  variant="outlined"
                  size="small"
                  inputRef={inputEl}
                  InputProps={{
                    inputProps: {
                      max: 3,
                      min: 1
                    }
                  }}
                />
              </Box>
              <Box mx={1}>
                <Button variant="contained" onClick={handleApply} color="primary">
                  Apply
                </Button>
              </Box>
            </Box>
          </Popover>
        </div>
      )}
    </PopupState>
  )
}

MovePositionPopOver.propTypes = {
  onMovePosition: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
}

export default MovePositionPopOver
