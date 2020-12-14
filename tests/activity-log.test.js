import React from "react";
import ReactDOM from "react-dom";
import ActivityLog from "../src/activity-log/activity-log";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(<ActivityLog />, div);

  ReactDOM.unmountComponentAtNode(div);
});
