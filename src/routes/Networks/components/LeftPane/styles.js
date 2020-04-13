const drawerWidth = 260

export default theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: theme.zIndex.drawer - 1
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  thumbWrapper: {
    margin: theme.spacing(3)
  },
  titleWrapper: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3)
  },
  image: {
    paddingTop: '100%',
    width: '100%',
    position: 'relative'
  },
  divider: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1)
  },
  button: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
  }
})
