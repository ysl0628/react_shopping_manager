import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";

let base_name = "";
process.env.NODE_ENV === "development"
  ? (base_name = "/")
  : (base_name = "/react_shopping_manager");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router basename={base_name}>
      <App />
    </Router>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
