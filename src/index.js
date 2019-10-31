import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import { DndProvider } from 'react-dnd'
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack'
import HTML5Backend from 'react-dnd-html5-backend'

import { SNACKBAR_MAX_STACK, SNACKBAR_AUTOHIDE_TIMEOUT } from 'config/constants'
import registerServiceWorker from './registerServiceWorker'
import Routes from './routes'
import store, { history } from './redux/store'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import theme from './theme'
import './styles/styles.scss'

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={SNACKBAR_MAX_STACK}
        autoHideDuration={SNACKBAR_AUTOHIDE_TIMEOUT}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
        <DndProvider backend={HTML5Backend}>
          <Routes history={history} />
        </DndProvider>
      </SnackbarProvider>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
)
registerServiceWorker()
