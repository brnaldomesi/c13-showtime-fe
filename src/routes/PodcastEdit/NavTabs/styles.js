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
  divider: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1)
  },
  buttons: {
    padding: theme.spacing(3)
  }
})
