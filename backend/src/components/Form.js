import React, { useState, useContext } from "react";

import UserContext from "../UserContext.js";
import auth from "../utils/auth.js";
import "./Form.css";

function Form() {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formType, setFormType] = useState("Log in");
  const { isAuth, setAuth, user, setUser } = useContext(UserContext);

  const errorFormStyle = {
    outline: "solid 1px #E57373",
    borderColor: "#E57373",
    backgroundColor: "#FFEBEE",
  };

  const errorTextStyle = {
    color: "#B71C1C",
  };

  const defaultStyle = {
    border: "1px solid #ccc",
    backgroundColor: "white",
  };

  const toggleForm = () => {
    if (formType == "Log in") {
      setFormType("Sign up");
    } else {
      setFormType("Log in");
    }
    setUsernameError("");
    setPasswordError("");
  };
  const handleSignup = async () => {
    // Must provide username and password
    setUsernameError("");
    setPasswordError("");

    if (!username) {
      setUsernameError("Must provide username.");
    }
    if (!password) {
      setPasswordError("Must provide password.");
    }
    // Constraints
    if (password.length < 8 && password.length > 0) {
      setPasswordError("Use 8 or more characters.");
    }

    if (username.length < 4 && username.length > 0) {
      setUsernameError("Use 4 or more characters.");
    }
    // POST
    const response = await fetch("http://localhost:1234/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const { token } = await response.json();

    if (token) {
      setAuth(true);
      // await fetchDashboard(token);
      const dashboardResponse = await fetch("http://localhost:1234/api/user", {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const { data } = await dashboardResponse.json();
      setUser(data.username);
      console.log(data);
    }
  };

  const handleLogin = async () => {
    // Form validation
    setUsernameError("");
    setPasswordError("");
    if (!username) {
      setUsernameError("Must provide username or password.");
    }
    if (!password) {
      setPasswordError("Must provide password.");
    }
    // POST
    const response = await fetch("http://localhost:1234/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const { token } = await response.json();

    if (token) {
      setAuth(true);
      // fetchDashboard(token);
    }

    console.log(token);
  };

  const handleClick = (cb) => {
    cb("");
  };

  return (
    <div className="form">
      {formType === "Sign up" ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSignup();
          }}
        >
          <div className="formheader">
            <div className="item">
              <h2>Sign up </h2>
            </div>
            <div className="item toggle">
              <a
                onClick={(event) => {
                  event.preventDefault();
                  toggleForm();
                }}
              >
                Already have an account? Log in!
              </a>
            </div>
          </div>

          <section>
            <label>Username</label>
            <input
              style={usernameError ? errorFormStyle : defaultStyle}
              type="text"
              value={username}
              placeholder=" "
              autoComplete="off"
              spellCheck="false"
              onFocus={(event) => {
                event.preventDefault();
                handleClick(setUsernameError);
              }}
              onChange={(event) => setUsername(event.target.value)}
            />
            {usernameError ? (
              <div style={errorTextStyle}>{usernameError}</div>
            ) : (
              <div className="constraints">Use 4 or more characters.</div>
            )}
          </section>

          <section>
            <label>Password</label>
            <input
              style={passwordError ? errorFormStyle : defaultStyle}
              type="password"
              value={password}
              onFocus={(event) => {
                event.preventDefault();
                handleClick(setPasswordError);
              }}
              onChange={(event) => setPassword(event.target.value)}
            />
            {passwordError ? (
              <div style={errorTextStyle}>{passwordError}</div>
            ) : (
              <div className="constraints">Use 8 or more characters.</div>
            )}
          </section>
          <button id="signin">Sign up</button>
        </form>
      ) : (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleLogin();
          }}
        >
          <div className="formheader">
            <div className="item">
              <h2>Log in </h2>
            </div>
            <div className="item toggle">
              <a
                onClick={(event) => {
                  event.preventDefault();
                  toggleForm();
                }}
              >
                Don't have an account? Sign up!
              </a>
            </div>
          </div>

          <section>
            <label>Username</label>
            <input
              style={usernameError ? errorFormStyle : defaultStyle}
              type="text"
              value={username}
              placeholder=" "
              autoComplete="off"
              spellCheck="false"
              onFocus={(event) => {
                event.preventDefault();
                handleClick(setUsernameError);
              }}
              onChange={(event) => setUsername(event.target.value)}
            />
            {usernameError ? (
              <div style={errorTextStyle}>{usernameError}</div>
            ) : (
              <div className="constraints">Enter username or email.</div>
            )}
          </section>

          <section>
            <label>Password</label>
            <input
              style={passwordError ? errorFormStyle : defaultStyle}
              type="password"
              value={password}
              onFocus={(event) => {
                event.preventDefault();
                handleClick(setPasswordError);
              }}
              onChange={(event) => setPassword(event.target.value)}
            />
            {passwordError ? (
              <div style={errorTextStyle}>{passwordError}</div>
            ) : (
              <div className="constraints">
                <a>Forgot password?</a>
              </div>
            )}
          </section>
          <button id="login">Log in</button>
        </form>
      )}
    </div>
  );
}

export default Form;
