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
    alignItems: 'center'
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
  },
  suggestionImage: {
    minWidth: theme.spacing(6),
    height: theme.spacing(6),
    marginRight: 10
  },
  suggestionText: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  chipRoot: {
    height: theme.spacing(7),
    borderRadius: 0
  },
  chipAvatar: {
    '.MuiChip-root &': {
      width: theme.spacing(7),
      height: theme.spacing(7),
      marginLeft: 0
    }
  }
})
