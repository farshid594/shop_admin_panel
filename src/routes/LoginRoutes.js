import React from "react";
import { Switch, Route } from "react-router-dom";
import Signin from "../pages/Login/Signin";

export default function LoginRoutes() {
  return (
    <Switch>
      <Route path="/" component={Signin} />
    </Switch>
  );
}
