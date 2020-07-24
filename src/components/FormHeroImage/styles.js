export default theme => ({
  root: {
    width: 330,
    height: 330,
    display: 'flex',
    position: 'relative',
    outline: 'lightgrey solid 1px'
  },
  heroImage: {
    maxWidth: 330,
    maxHeight: 330,
    margin: 'auto'
  },
  imageButtonGroup: {
    display: 'flex',
    position: 'absolute',
    bottom: 0,
    right: 0
  },
  deleteButton: {
    padding: theme.spacing(0.8)
  },
  addButton: {
    padding: theme.spacing(0.8),
    minWidth: 'auto'
  }
})
