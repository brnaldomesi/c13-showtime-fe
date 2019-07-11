export default theme => ({
  root: {
    padding: `0 ${theme.spacing(6)}px`,
    position: 'relative',
    marginBottom: theme.spacing(3)
  },
  arrowLeft: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    left: 0,
    width: theme.spacing(5),
    height: theme.spacing(5),
    padding: 0,
    fontSize: theme.spacing(5)
  },
  arrowRight: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    right: 0,
    width: theme.spacing(5),
    height: theme.spacing(5),
    padding: 0,
    fontSize: theme.spacing(5)
  },
  avatar: {
    width: '100%',
    paddingTop: '100%',
    marginBottom: theme.spacing(1),
  }
})
