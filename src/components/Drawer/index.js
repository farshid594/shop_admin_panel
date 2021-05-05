import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import PeopleIcon from "@material-ui/icons/People";
import useStyles from "./index.styles";
import profileImage from "../../assets/images/profile.png";
import RoleIcon from "../../assets/images/role.svg";
import PermisionIcon from "../../assets/images/permision.svg";
import { NavLink } from "react-router-dom";

export default function Index() {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.imgDiv}>
        <img src={profileImage} alt="admin" className={classes.img} />
      </div>
      <Divider />
      <List>
        <ListItem
          button
          component={NavLink}
          to="/"
          activeClassName={classes.menuItemActive}
          exact
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to="/permisions"
          activeClassName={classes.menuItemActive}
        >
          <ListItemIcon>
            <img src={PermisionIcon} className={classes.menuItemIcon} alt="" />
          </ListItemIcon>
          <ListItemText primary="Permisions" />
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to="/roles"
          activeClassName={classes.menuItemActive}
        >
          <ListItemIcon>
            <img src={RoleIcon} className={classes.menuItemIcon} alt="" />
          </ListItemIcon>
          <ListItemText primary="Roles" />
        </ListItem>
      </List>
    </div>
  );
}
