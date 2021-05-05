import React from "react";
import LoginContextProvider from "./contexts/LoginContext";
import Main from "./Main";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <LoginContextProvider>
          <Main />
        </LoginContextProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
