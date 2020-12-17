import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Health from "./health";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Health />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});