export default theme => ({
  root: {
    marginBottom: theme.spacing(3)
  },
  dropzone: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.grey[100],
    border: `1px solid ${theme.palette.grey[400]}`,
    borderRadius: theme.shape.borderRadius,
    cursor: 'pointer',
    padding: theme.spacing(2),
    marginTop: theme.spacing(2)
  },
  icon: {
    fontSize: 64,
    color: theme.palette.grey[400]
  },
  image: {
    display: 'block',
    width: '100%',
    maxWidth: 200
  },
  label: {
    marginBottom: theme.spacing(1)
  }
})
