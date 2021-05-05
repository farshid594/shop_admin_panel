import React, { useContext } from "react";
import { LoginContext } from "./contexts/LoginContext";
import LoginRoutes from "./routes/LoginRoutes";
import MainRoutes from "./routes/MainRoutes";

export default function Main() {
  let { isLoggedIn } = useContext(LoginContext);

  if (isLoggedIn) {
    return <MainRoutes />;
  }
  return <LoginRoutes />;
}
