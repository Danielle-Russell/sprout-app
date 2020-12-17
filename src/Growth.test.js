import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Growth from "./Growth";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Growth />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});