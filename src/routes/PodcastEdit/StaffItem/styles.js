import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    padding: theme.spacing(2),
    flexDirection: 'column',
  },
  number: {
    textAlign: 'center',
    alignSelf: 'center',
    width: theme.spacing(6),
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 150,
    height: 150,
  },
  title: {
    marginBottom: theme.spacing(2)
  },
  edit: {
    float: 'right'
  }
}))
