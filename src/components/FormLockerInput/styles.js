export default theme => ({
  root: {
    marginBottom: theme.spacing(3),
  },
  label: {
    marginTop: 0,
    marginBottom: theme.spacing(1),
  },
  inputRow: {
    padding: theme.spacing(1) / 2,
    display: 'flex',
    alignItems: 'center',
    border: `1px solid rgba(0, 0, 0, .23)`,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
})
