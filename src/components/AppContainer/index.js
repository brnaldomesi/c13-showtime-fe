import React from 'react'
import { withRouter } from 'react-router'
import CssBaseline from '@material-ui/core/CssBaseline'
import { usePreviousValue } from 'utils/hooks'

const AppContainer = ({ children, location }) => {
  usePreviousValue(location, prev => {
    if (location !== prev) {
      window.scrollTo(0, 0)
    }
  })

  return (
    <>
      <CssBaseline />
      {children}
    </>
  )
}

export default withRouter(AppContainer)
