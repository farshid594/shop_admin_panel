import React, { createContext, useState } from "react";

const LoginContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});
export { LoginContext };

function LoginContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.token && localStorage.token.length > 0 ? true : false
  );
  const login = () => {
    setIsLoggedIn(true);
  };
  const logout = () => {
    setIsLoggedIn(false);
  };
  return (
    <LoginContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export default LoginContextProvider;
