import React from "react";

import "./Dashboard.css";

function Dashboard(props) {
  return (
    <div className="card">
      <h2>Hello, {props.username}!</h2>
    </div>
  );
}

export default Dashboard;
