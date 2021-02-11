import React, { useState } from "react";

import UserContext from "./UserContext.js";
import "./App.css";
import Nav from "./components/Nav.js";
import Form from "./components/Form.js";
import Dashboard from "./components/Dashboard.js";

function App() {
  const [isAuth, setAuth] = useState(false);
  const [user, setUser] = useState("");
  const value = { isAuth, setAuth, user, setUser };

  return (
    <UserContext.Provider value={value}>
      <Nav />
      {isAuth ? <Dashboard username={user} /> : <Form />}
    </UserContext.Provider>
  );
}
export default App;
