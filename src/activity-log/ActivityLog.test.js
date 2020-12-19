import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import ActivityLog from "./activity-log";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <ActivityLog />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
