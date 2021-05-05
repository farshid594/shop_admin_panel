import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import useStyles from "./index.styles";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

export default function Index({ logoutProccess, name, handleDrawerToggle }) {
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          {name}
        </Typography>
        <IconButton onClick={logoutProccess}>
          <ExitToAppIcon color="secondary" fontSize="large" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
