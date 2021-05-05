import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import { useTheme } from "@material-ui/core/styles";
import useStyles from "./MainRoutes.styles";
import DrawerContent from "../components/Drawer";
import { Route, Switch, useLocation } from "react-router";
import Users from "../pages/users";
import Permisions from "../pages/permisions";
import Roles from "../pages/roles";
import { LoginContext } from "../contexts/LoginContext";
import CustomAppBar from "../components/CustomAppBar";

function MainRoutes(props) {
  let { logout } = useContext(LoginContext);
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [name, setName] = useState("");
  let pathName = useLocation().pathname;
  useEffect(() => {
    setMobileOpen(false);
  }, [pathName]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    var status;
    fetch("http://localhost:8000/admin/user-info", {
      method: "GET",
      headers: {
        Authorization: localStorage.token,
      },
    })
      .then((response) => {
        status = response.status;
        return response.json();
      })
      .then((responseJson) => {
        console.log(status, responseJson);
        if (status === 200) {
          setName(responseJson.user.name);
        } else if (status === 401) {
          localStorage.clear();
          logout();
        }
      });
  }, []);

  const logoutProccess = () => {
    var status;
    fetch("http://localhost:8000/admin/users/logout", {
      method: "POST",
      headers: {
        Authorization: localStorage.token,
      },
    })
      .then((response) => {
        status = response.status;
        return response.json();
      })
      .then((responseJson) => {
        if (status === 200) {
          localStorage.clear();
          logout();
        }
      });
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <CustomAppBar
        name={name}
        handleDrawerToggle={handleDrawerToggle}
        logoutProccess={logoutProccess}
      />
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <DrawerContent />
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <DrawerContent />
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <Switch>
          <Route exact path="/" component={Users} />
          <Route exact path="/permisions" component={Permisions} />
          <Route exact path="/roles" component={Roles} />
        </Switch>
      </main>
    </div>
  );
}

MainRoutes.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default MainRoutes;
