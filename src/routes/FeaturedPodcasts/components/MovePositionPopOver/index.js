import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'
import IconButton from '@material-ui/core/IconButton'
import Popover from '@material-ui/core/Popover'
import React from 'react'
import { TextField } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import styles from './styles'

const useStyles = makeStyles(styles)

export default function MovePositionPopOver() {
  const classes = useStyles()

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
                <TextField id="outlined-number" type="number" variant="outlined" size="small" />
              </Box>
              <Box mx={1}>
                <Button variant="contained" color="primary">
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
