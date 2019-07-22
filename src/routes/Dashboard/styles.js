export default theme => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  list: {
    marginTop: theme.spacing(3),
    backgroundColor: theme.palette.background.paper
  }
})
