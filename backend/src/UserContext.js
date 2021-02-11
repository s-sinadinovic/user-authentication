import React from "react";

const UserContext = React.createContext({
  user: "",
  setUser: () => {},
  isAuth: false,
  setAuth: () => {},
  // theme: "light",
  // toggleTheme: () => {},
});

export default UserContext;
