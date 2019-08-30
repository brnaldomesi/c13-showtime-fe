const drawerWidth = 240

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
    width: '100%'
  },
  divider: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1)
  },
  button: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3)
  }
})
