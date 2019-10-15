export default theme => ({
  root: {
    marginBottom: theme.spacing(3)
  },
  label: {
    marginTop: 0,
    marginBottom: theme.spacing(1)
  },
  inputRow: {
    padding: theme.spacing(1) / 2,
    display: 'flex',
    alignItems: 'center',
    border: `1px solid rgba(0, 0, 0, .23)`
  },
  input: {
    minHeight: 40,
    flex: 1,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  iconButton: {
    padding: 10
  },
  divider: {
    width: 1,
    height: 'auto',
    margin: 4,
    alignSelf: 'stretch'
  }
})
