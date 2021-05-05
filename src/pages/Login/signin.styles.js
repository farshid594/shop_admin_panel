import { makeStyles } from "@material-ui/core";

const usetStyles = makeStyles((theme) => ({
  root: {
    marginTop: 30,
  },
  paper: {
    padding: 50,
    width: 400,
    boxSizing: "border-box",
    [theme.breakpoints.down("xs")]: {
      width: "90%",
      padding: 20,
    },
  },
  input: {
    marginTop: 20,
  },
  img: {
    width: "80%",
  },
}));
export default usetStyles;
