import { Grid, Paper, TextField, Button } from "@material-ui/core";
import React, { useState, useContext } from "react";
import useStyles from "./signin.styles";
import adminIcon from "../../assets/images/admin-icon.svg";
import { Alert } from "@material-ui/lab";
import { LoginContext } from "../../contexts/LoginContext";

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function Signin() {
  let { login } = useContext(LoginContext);
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const signinProccess = () => {
    if (emailRegex.test(email) && password.length > 5) {
      setError("");
      var status;
      fetch("http://localhost:8000/app/signin-as-admin", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          status = response.status;
          return response.json();
        })
        .then((responseJson) => {
          console.log(status, responseJson);
          if (status === 404 || status === 500) {
            setError(responseJson.message);
          } else if (status === 200) {
            localStorage.setItem("token", responseJson.token);
            login();
          } else {
            setError("server error");
          }
        });
    }
  };
  return (
    <Grid container justify="center" align="center" className={classes.root}>
      <Paper className={classes.paper}>
        <img src={adminIcon} alt="admin" className={classes.img} />
        {error.length > 0 ? <Alert severity="error">{error}</Alert> : null}
        <TextField
          label="Email"
          variant="outlined"
          size="small"
          fullWidth
          className={classes.input}
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          error={emailError.length > 0}
          helperText={emailError}
          onBlur={() => {
            if (!emailRegex.test(email)) {
              setEmailError("Email invalid");
            }
          }}
          onFocus={() => {
            setEmailError("");
          }}
        />
        <TextField
          label="Password"
          variant="outlined"
          size="small"
          fullWidth
          className={classes.input}
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          error={passwordError.length > 0}
          helperText={passwordError}
          onBlur={() => {
            if (password.length < 6) {
              setPasswordError("password invalid");
            }
          }}
          onFocus={() => {
            setPasswordError("");
          }}
        />
        <Button
          variant="outlined"
          size="medium"
          fullWidth
          color="secondary"
          className={classes.input}
          disabled={!emailRegex.test(email) || password.length < 6}
          onClick={signinProccess}
        >
          Signin
        </Button>
      </Paper>
    </Grid>
  );
}
