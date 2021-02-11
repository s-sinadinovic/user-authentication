import React, { useContext } from "react";

import "./Nav.css";
import UserContext from "../UserContext.js";

function Nav() {
  const { isAuth, setAuth } = useContext(UserContext);

  return (
    <div className="nav">
      <a>Auth</a>
      {isAuth ? (
        <button onClick={() => setAuth(false)}>Sign out</button>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Nav;
