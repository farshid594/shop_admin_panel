import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  imgDiv: {
    height: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: "70%",
  },
  menuItemIcon: {
    width: 26,
  },
  menuItemActive: {
    color: theme.palette.primary.main,
  },
}));

export default useStyles;
