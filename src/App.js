import React from "react";
import LoginContextProvider from "./contexts/LoginContext";
import Main from "./Main";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";
import Alert from './components/Alert'
import AlertContextProvider from './components/Alert/AlertContext'

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <AlertContextProvider>
          <LoginContextProvider>
            <Main />
            <Alert />
          </LoginContextProvider>
        </AlertContextProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
