import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import AddSprout from "./Add-Sprout";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <AddSprout />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});