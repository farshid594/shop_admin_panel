import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#3371cd",
      contrastText: "#FFF",
    },
    secondary: {
      main: "#25d9da",
      contrastText: "#FFF",
    },
    text: {
      primary: "#3c4859",
      secondary: "#7d8591",
      disabled: "#b18080",
    },
  },
  typography: {
    h1: {
      fontSize: 40,
      fontWeight: "bold",
      lineHeight: 2,
    },
    h2: {
      fontSize: 22,
      fontWeight: "bold",
    },
    h3: {
      fontSize: 20,
      fontWeight: "bold",
    },
    h4: {
      fontSize: 18,
      fontWeight: "bold",
    },
    h5: {
      fontSize: 16,
      fontWeight: "bold",
    },
    h6: {
      fontSize: 14,
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: 24,
    },
    subtitle2: {
      fontSize: 12,
    },
    body1: {
      fontSize: 14,
      lineHeight: 2.2,
    },
    body2: {
      fontSize: 12,
    },
    button: {
      fontSize: 18,
      textTransform: "none",
    },
  },
});

export default responsiveFontSizes(theme);
